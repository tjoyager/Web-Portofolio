/**
 * LinkedIn Data Sync Script
 * 
 * Membaca file CSV yang di-export dari LinkedIn dan mengupdate profile-data.json
 * 
 * Cara pakai:
 * 1. Buka LinkedIn → Settings → Data Privacy → Get a copy of your data
 * 2. Pilih data yang ingin di-export (Positions, Education, Skills, Profile)
 * 3. Download dan extract ke folder `linkedin-data/` di root project
 * 4. Jalankan: npm run sync-linkedin
 * 
 * File CSV yang didukung:
 * - Profile.csv       → nama, headline, summary
 * - Positions.csv     → pengalaman kerja / organisasi
 * - Education.csv     → riwayat pendidikan
 * - Skills.csv        → keahlian teknis
 */

import * as fs from "fs";
import * as path from "path";

const LINKEDIN_DIR = path.join(process.cwd(), "linkedin-data");
const PROFILE_DATA_PATH = path.join(process.cwd(), "data", "profile-data.json");

// ─── CSV Parser ──────────────────────────────────────────────────────────────

function parseCSV(content: string): Record<string, string>[] {
  const lines = content.trim().split("\n");
  if (lines.length < 2) return [];

  const headers = parseCSVLine(lines[0]);
  const rows: Record<string, string>[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    const row: Record<string, string> = {};
    headers.forEach((header, idx) => {
      row[header.trim()] = (values[idx] || "").trim();
    });
    rows.push(row);
  }

  return rows;
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

// ─── File Readers ────────────────────────────────────────────────────────────

function readCSVFile(filename: string): Record<string, string>[] | null {
  const filepath = path.join(LINKEDIN_DIR, filename);
  if (!fs.existsSync(filepath)) {
    console.log(`  ⚠️  ${filename} tidak ditemukan, dilewati.`);
    return null;
  }
  console.log(`  ✅ Membaca ${filename}...`);
  const content = fs.readFileSync(filepath, "utf-8");
  return parseCSV(content);
}

// ─── Sync Functions ──────────────────────────────────────────────────────────

function syncProfile(
  data: Record<string, string>[],
  profileData: any
): void {
  if (data.length === 0) return;
  const profile = data[0];

  if (profile["First Name"] && profile["Last Name"]) {
    profileData.profile.name = `${profile["First Name"]} ${profile["Last Name"]}`;
  }
  if (profile["Headline"]) {
    // Parse roles from headline (usually "Role1 | Role2 | Role3")
    const roles = profile["Headline"]
      .split(/[|,·]/)
      .map((r: string) => r.trim())
      .filter(Boolean);
    if (roles.length > 0) {
      profileData.profile.roles = roles;
    }
  }
  if (profile["Summary"]) {
    profileData.profile.summary = profile["Summary"];
  }

  console.log(`  📝 Profile updated: ${profileData.profile.name}`);
}

function syncPositions(
  data: Record<string, string>[],
  profileData: any
): void {
  const experiences = data.map((pos) => {
    const startDate = pos["Started On"] || "";
    const endDate = pos["Finished On"] || "Sekarang";
    
    const startYear = startDate ? new Date(startDate).getFullYear().toString() : "";
    const endYear = endDate === "Sekarang" ? "Sekarang" : new Date(endDate).getFullYear().toString();
    
    const period = startYear ? `${startYear} - ${endYear}` : endYear;

    const title = pos["Company Name"] 
      ? `${pos["Title"]} - ${pos["Company Name"]}`
      : pos["Title"] || "Unknown Position";

    return {
      title,
      period,
      description: pos["Description"] || "",
    };
  });

  if (experiences.length > 0) {
    profileData.experience = experiences;
    console.log(`  📝 ${experiences.length} pengalaman di-sync`);
  }
}

function syncEducation(
  data: Record<string, string>[],
  profileData: any
): void {
  const education = data.map((edu) => {
    const startDate = edu["Start Date"] || "";
    const endDate = edu["End Date"] || "Sekarang";
    
    const startYear = startDate ? startDate.split("-")[0] || startDate : "";
    const endYear = endDate === "Sekarang" ? "Sekarang" : (endDate.split("-")[0] || endDate);
    
    const period = startYear ? `${startYear} - ${endYear}` : endYear;

    return {
      title: edu["School Name"] || "Unknown School",
      period,
      description: [edu["Degree Name"], edu["Notes"]].filter(Boolean).join(" - ") || "",
    };
  });

  if (education.length > 0) {
    profileData.education = education;
    console.log(`  📝 ${education.length} pendidikan di-sync`);
  }
}

function syncSkills(
  data: Record<string, string>[],
  profileData: any
): void {
  const skillNames = data.map((s) => s["Name"] || s["Skill"]).filter(Boolean);

  if (skillNames.length === 0) return;

  // Auto-categorize skills into existing categories or create "Other"
  const existingCategories = profileData.skills.map((s: any) => ({
    ...s,
    _matchedNew: [] as string[],
  }));

  const uncategorized: string[] = [];

  for (const skill of skillNames) {
    let matched = false;
    for (const cat of existingCategories) {
      // Check if skill already exists in this category
      const existsInCategory = cat.items.some(
        (item: string) => item.toLowerCase() === skill.toLowerCase()
      );
      if (existsInCategory) {
        matched = true;
        break;
      }
    }
    if (!matched) {
      uncategorized.push(skill);
    }
  }

  // Add uncategorized skills to an "Other Skills" category
  if (uncategorized.length > 0) {
    const otherIdx = profileData.skills.findIndex(
      (s: any) => s.category === "Other Skills (LinkedIn)"
    );
    if (otherIdx >= 0) {
      profileData.skills[otherIdx].items = [
        ...new Set([...profileData.skills[otherIdx].items, ...uncategorized]),
      ];
    } else {
      profileData.skills.push({
        category: "Other Skills (LinkedIn)",
        items: uncategorized,
      });
    }
  }

  console.log(
    `  📝 ${skillNames.length} skills dari LinkedIn (${uncategorized.length} baru ditambahkan)`
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────

function main() {
  console.log("🔄 LinkedIn Sync Script");
  console.log("═══════════════════════════════════════\n");

  // Check linkedin-data directory
  if (!fs.existsSync(LINKEDIN_DIR)) {
    console.log("❌ Folder 'linkedin-data/' tidak ditemukan!\n");
    console.log("📋 Cara menggunakan:");
    console.log("   1. Buka LinkedIn → Settings → Data Privacy");
    console.log("   2. Klik 'Get a copy of your data'");
    console.log("   3. Pilih data: Profile, Positions, Education, Skills");
    console.log("   4. Download dan extract ke folder 'linkedin-data/'");
    console.log("   5. Jalankan ulang: npm run sync-linkedin\n");
    
    // Create the directory for convenience
    fs.mkdirSync(LINKEDIN_DIR, { recursive: true });
    console.log("📁 Folder 'linkedin-data/' telah dibuat. Silakan isi dengan data LinkedIn export.\n");
    process.exit(1);
  }

  // Load existing profile data
  if (!fs.existsSync(PROFILE_DATA_PATH)) {
    console.log("❌ File 'data/profile-data.json' tidak ditemukan!");
    process.exit(1);
  }

  const profileData = JSON.parse(fs.readFileSync(PROFILE_DATA_PATH, "utf-8"));
  console.log("📂 Membaca data LinkedIn dari 'linkedin-data/'...\n");

  // Sync each data type
  let synced = 0;

  const profileCSV = readCSVFile("Profile.csv");
  if (profileCSV) {
    syncProfile(profileCSV, profileData);
    synced++;
  }

  const positionsCSV = readCSVFile("Positions.csv");
  if (positionsCSV) {
    syncPositions(positionsCSV, profileData);
    synced++;
  }

  const educationCSV = readCSVFile("Education.csv");
  if (educationCSV) {
    syncEducation(educationCSV, profileData);
    synced++;
  }

  const skillsCSV = readCSVFile("Skills.csv");
  if (skillsCSV) {
    syncSkills(skillsCSV, profileData);
    synced++;
  }

  if (synced === 0) {
    console.log("\n⚠️  Tidak ada file CSV LinkedIn ditemukan di 'linkedin-data/'.");
    console.log("   Pastikan file-file berikut ada:");
    console.log("   - Profile.csv");
    console.log("   - Positions.csv");
    console.log("   - Education.csv");
    console.log("   - Skills.csv\n");
    process.exit(1);
  }

  // Update sync metadata
  profileData.meta = {
    lastSynced: new Date().toISOString(),
    source: "linkedin-export",
  };

  // Auto-update terminal content based on profile
  profileData.terminal = [
    { type: "command", text: "hadryan@its:~$ whoami" },
    { type: "output", text: profileData.profile.name },
    { type: "command", text: "hadryan@its:~$ fetch info" },
    { type: "output", text: `Role: ${profileData.profile.roles[0] || "Student"}` },
    { type: "output", text: `Focus: ${profileData.profile.aspiration?.title || "Technology"}` },
    { type: "output", text: "Status: Searching for innovation..." },
    { type: "command", text: "hadryan@its:~$ ls skills/" },
    {
      type: "output",
      text: profileData.skills
        .flatMap((s: any) => s.items.slice(0, 2))
        .slice(0, 5)
        .join("  "),
    },
    { type: "command", text: "hadryan@its:~$ _" },
  ];

  // Write updated data
  fs.writeFileSync(PROFILE_DATA_PATH, JSON.stringify(profileData, null, 2), "utf-8");

  console.log("\n═══════════════════════════════════════");
  console.log(`✅ Sync selesai! ${synced} file berhasil di-sync.`);
  console.log(`📄 Data tersimpan di: data/profile-data.json`);
  console.log(`🕐 Timestamp: ${profileData.meta.lastSynced}`);
  console.log("\n🚀 Jalankan 'npm run dev' untuk melihat hasilnya!\n");
}

main();
