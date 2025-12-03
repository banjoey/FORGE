#!/usr/bin/env node
/**
 * Daniel Security Scanner CLI
 *
 * Usage:
 *   emma-scan <file>                  # Scan a single file
 *   emma-scan <directory>             # Scan all TypeScript/JavaScript files
 *   emma-scan --stdin                 # Read code from stdin
 *   emma-scan --help                  # Show help
 */

import { reviewCode, performSTRIDE } from '../src/daniel/security-review'
import { promises as fs } from 'fs'
import * as path from 'path'

interface ScanOptions {
  stride?: boolean
  json?: boolean
  verbose?: boolean
}

async function scanFile(filePath: string, options: ScanOptions = {}): Promise<void> {
  try {
    const code = await fs.readFile(filePath, 'utf-8')
    const fileName = path.basename(filePath)

    console.log(`\n${'='.repeat(60)}`)
    console.log(`Scanning: ${fileName}`)
    console.log('='.repeat(60))

    const analysis = options.stride
      ? await performSTRIDE(code)
      : await reviewCode(code)

    if (options.json) {
      console.log(JSON.stringify(analysis, null, 2))
      return
    }

    if (analysis.detected) {
      console.log(`\n❌ Vulnerability Detected!\n`)
      console.log(`   Name: ${analysis.vulnerability}`)
      console.log(`   Severity: ${analysis.severity}`)
      console.log(`   STRIDE: ${analysis.strideCategory}`)
      console.log(`   OWASP: ${analysis.owasp}`)
      console.log(`   CMMC: ${analysis.cmmc}${analysis.cmmcDomain ? ` (${analysis.cmmcDomain})` : ''}`)

      if (analysis.cmmcPractice && options.verbose) {
        console.log(`\n   CMMC Practice: ${analysis.cmmcPractice}`)
      }

      console.log(`\n   Mitigation:\n   ${analysis.mitigation}`)

      if (analysis.codeExample) {
        console.log(`\n   Secure Code Example:`)
        console.log(`   ${analysis.codeExample.split('\n').join('\n   ')}`)
      }

      if (options.stride && analysis.threats && analysis.threats.length > 1) {
        console.log(`\n   Additional Threats (${analysis.threats.length - 1}):`)
        analysis.threats.slice(1).forEach((threat: any, i: number) => {
          console.log(`   ${i + 2}. ${threat.description} (${threat.severity})`)
        })
      }

      process.exitCode = 1
    } else {
      console.log(`\n✅ No vulnerabilities detected`)
      console.log(`   ${analysis.mitigation}`)
    }

    console.log('')

  } catch (error: any) {
    console.error(`Error scanning ${filePath}: ${error.message}`)
    process.exitCode = 1
  }
}

async function scanDirectory(dirPath: string, options: ScanOptions = {}): Promise<void> {
  const extensions = ['.ts', '.tsx', '.js', '.jsx']
  let totalFiles = 0
  let vulnerableFiles = 0

  async function walkDir(dir: string): Promise<void> {
    const entries = await fs.readdir(dir, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)

      if (entry.isDirectory()) {
        // Skip node_modules, dist, build directories
        if (!['node_modules', 'dist', 'build', '.git'].includes(entry.name)) {
          await walkDir(fullPath)
        }
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name)
        if (extensions.includes(ext)) {
          totalFiles++
          const code = await fs.readFile(fullPath, 'utf-8')
          const analysis = await reviewCode(code)

          if (analysis.detected) {
            vulnerableFiles++
            console.log(`❌ ${fullPath}`)
            console.log(`   ${analysis.vulnerability} (${analysis.severity})`)
          } else if (options.verbose) {
            console.log(`✅ ${fullPath}`)
          }
        }
      }
    }
  }

  console.log(`\nScanning directory: ${dirPath}\n`)
  await walkDir(dirPath)

  console.log(`\n${'='.repeat(60)}`)
  console.log(`Scan complete: ${totalFiles} files scanned`)
  console.log(`Vulnerabilities found in ${vulnerableFiles} file(s)`)
  console.log('='.repeat(60))

  if (vulnerableFiles > 0) {
    process.exitCode = 1
  }
}

async function scanStdin(options: ScanOptions = {}): Promise<void> {
  let code = ''

  process.stdin.setEncoding('utf-8')

  for await (const chunk of process.stdin) {
    code += chunk
  }

  const analysis = options.stride
    ? await performSTRIDE(code)
    : await reviewCode(code)

  if (options.json) {
    console.log(JSON.stringify(analysis, null, 2))
  } else {
    console.log('\nDaniel Security Scan Results:\n')
    if (analysis.detected) {
      console.log(`❌ ${analysis.vulnerability} (${analysis.severity})`)
      console.log(`   CMMC: ${analysis.cmmc}`)
      console.log(`   Mitigation: ${analysis.mitigation}`)
      process.exitCode = 1
    } else {
      console.log(`✅ No vulnerabilities detected`)
    }
  }
}

function showHelp(): void {
  console.log(`
Daniel Security Scanner - CMMC Level 2 Compliance & STRIDE Threat Modeling

Usage:
  emma-scan <file>                 Scan a single file
  emma-scan <directory>            Scan all TypeScript/JavaScript files
  emma-scan --stdin                Read code from stdin

Options:
  --stride                         Perform STRIDE threat modeling (find all threats)
  --json                           Output results as JSON
  --verbose, -v                    Show detailed output
  --help, -h                       Show this help message

Examples:
  emma-scan src/auth/login.ts
  emma-scan src/
  emma-scan --stride src/payment.ts
  cat suspicious.js | emma-scan --stdin --json

Exit Codes:
  0 - No vulnerabilities found
  1 - Vulnerabilities detected or error occurred

Features:
  • 50+ vulnerability patterns (SQL injection, XSS, auth bypass, etc.)
  • STRIDE threat modeling (6 categories)
  • CMMC Level 2 compliance mapping (17 domains, 25+ practices)
  • Remediation guidance with secure code examples

For more information: https://github.com/banjoey/FORGE
`)
}

async function main() {
  const args = process.argv.slice(2)

  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    showHelp()
    return
  }

  const options: ScanOptions = {
    stride: args.includes('--stride'),
    json: args.includes('--json'),
    verbose: args.includes('--verbose') || args.includes('-v')
  }

  if (args.includes('--stdin')) {
    await scanStdin(options)
    return
  }

  const target = args.find(arg => !arg.startsWith('--') && !arg.startsWith('-'))

  if (!target) {
    console.error('Error: No file or directory specified')
    showHelp()
    process.exit(1)
  }

  const stats = await fs.stat(target)

  if (stats.isFile()) {
    await scanFile(target, options)
  } else if (stats.isDirectory()) {
    await scanDirectory(target, options)
  } else {
    console.error(`Error: ${target} is not a file or directory`)
    process.exit(1)
  }
}

main().catch(error => {
  console.error('Fatal error:', error)
  process.exit(1)
})
