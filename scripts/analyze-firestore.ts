
import * as fs from "fs";
import * as path from "path";

/* eslint-disable @typescript-eslint/no-explicit-any */

const EXPORT_DIR = path.join(process.cwd(), "data", "firestore_export");
const REPORT_FILE = path.join(EXPORT_DIR, "REPORT.md");

interface FieldAnalysis {
  type: string;
  count: number;
  nullCount: number;
  example: any;
}

interface SchemaAnalysis {
  totalDocs: number;
  fields: Record<string, FieldAnalysis>;
}

function analyzeType(value: any): string {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  if (value instanceof Date) return "date"; // unlikely in JSON unless revived
  return typeof value;
}

function analyzeCollection(collectionName: string, docs: any[]): SchemaAnalysis {
  const analysis: SchemaAnalysis = {
    totalDocs: docs.length,
    fields: {},
  };

  for (const doc of docs) {
    for (const [key, value] of Object.entries(doc)) {
      if (!analysis.fields[key]) {
        analysis.fields[key] = {
          type: analyzeType(value),
          count: 0,
          nullCount: 0,
          example: null,
        };
      }
      
      const field = analysis.fields[key];
      field.count++;
      
      if (value === null || value === undefined) {
        field.nullCount++;
      } else {
        // Update type if previous was null or different (simple majority or mixed)
        const currentType = analyzeType(value);
        if (field.type === "null" && currentType !== "null") {
          field.type = currentType;
        } else if (field.type !== "mixed" && field.type !== "null" && currentType !== field.type && currentType !== "null") {
           field.type = `mixed (${field.type} | ${currentType})`;
        }
        
        if (!field.example && value !== "") {
           // Truncate long strings
           if (typeof value === 'string' && value.length > 50) {
             field.example = value.substring(0, 50) + "...";
           } else {
             field.example = value;
           }
        }
      }
    }
  }
  return analysis;
}

function generateReport(analyses: Record<string, SchemaAnalysis>): string {
  let report = "# Firestore Schema Analysis Report\n\n";
  
  for (const [collection, analysis] of Object.entries(analyses)) {
    report += `## Collection: ${collection}\n`;
    report += `- Total Documents: ${analysis.totalDocs}\n\n`;
    report += `| Field | Type | Presence | Nulls | Example |\n`;
    report += `|---|---|---|---|---|\n`;
    
    const sortedFields = Object.entries(analysis.fields).sort();
    
    for (const [field, data] of sortedFields) {
      const presence = `${Math.round((data.count / analysis.totalDocs) * 100)}%`;
      const exampleStr = JSON.stringify(data.example) || "-";
      report += `| \`${field}\` | ${data.type} | ${presence} | ${data.nullCount} | ${exampleStr} |\n`;
    }
    report += "\n";
  }
  
  return report;
}

async function main() {
  if (!fs.existsSync(EXPORT_DIR)) {
    console.error(`Directory not found: ${EXPORT_DIR}. Run export-firestore.ts first.`);
    process.exit(1);
  }

  const files = fs.readdirSync(EXPORT_DIR).filter(f => f.endsWith(".json"));
  const analyses: Record<string, SchemaAnalysis> = {};

  for (const file of files) {
    const collectionName = path.basename(file, ".json");
    const content = fs.readFileSync(path.join(EXPORT_DIR, file), "utf-8");
    const docs = JSON.parse(content);
    analyses[collectionName] = analyzeCollection(collectionName, docs);
  }

  const report = generateReport(analyses);
  fs.writeFileSync(REPORT_FILE, report);
  console.log(`Analysis report saved to ${REPORT_FILE}`);
}

main();
