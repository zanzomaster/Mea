import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors"; // <--- เพิ่มบรรทัดนี้
import path from "path";
import multer from "multer";
import fs from "fs";

const app = express();
const prisma = new PrismaClient();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    // ดึงนามสกุลไฟล์เดิม
    const ext = path.extname(file.originalname) || ".pdf";
    // ตั้งชื่อไฟล์ใหม่แบบ unique พร้อมนามสกุล
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  }
});
const upload = multer({ storage });

app.use(cors()); // <--- เพิ่มบรรทัดนี้
app.use(express.json());

// เพิ่มบรรทัดนี้ เพื่อให้เข้าถึงไฟล์ใน uploads ได้ผ่าน URL
app.use("/uploads", express.static("uploads"));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from backend!");
});

app.get("/users", async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.post("/users", async (req: Request, res: Response) => {
  const { name, email, password, role, zoneIds } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "กรุณากรอกข้อมูลให้ครบถ้วน" });
  }
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
        role: role || "admin"
      }
    });

    let updatedUser = user;
    if (zoneIds && Array.isArray(zoneIds) && zoneIds.length > 0) {
      updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: {
          zones: { connect: zoneIds.map((id: number) => ({ id })) }
        },
        include: { zones: true }
      });
    } else {
      updatedUser = await prisma.user.findUnique({
        where: { id: user.id },
        include: { zones: true }
      }) as typeof user & { zones: any };
    }

    res.json({ message: "สมัครสมาชิกสำเร็จ", user: updatedUser });
  } catch (error) {
    res.status(400).json({ error: "อีเมลนี้ถูกใช้ไปแล้ว" });
  }
});

app.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "กรุณากรอกข้อมูลให้ครบถ้วน" });
  }
  // ดึง user พร้อม zones
  const user = await prisma.user.findUnique({
    where: { email },
    include: { zones: true }
  });
  if (!user || user.password !== password) {
    return res.status(401).json({ error: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" });
  }
  res.json({
    message: "เข้าสู่ระบบสำเร็จ",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      zones: user.zones
    }
  });
});

// GET profile by userId (เช่น /profile?userId=1)
app.get("/profile", async (req: Request, res: Response) => {
  const userId = Number(req.query.userId);
  if (!userId) {
    return res.status(400).json({ error: "กรุณาระบุ userId" });
  }
  const profile = await prisma.profile.findUnique({ where: { userId } });
  if (!profile) {
    return res.status(404).json({ error: "ไม่พบโปรไฟล์" });
  }
  res.json(profile);
});

// POST/PUT profile (สร้างหรืออัปเดตโปรไฟล์)
app.post("/profile", async (req: Request, res: Response) => {
  const {
    userId,
    firstName,
    lastName,
    gender,
    birthDate,
    nationality,
    religion,
    phone,
    englishLevel,
    internshipStart,
    internshipEnd,
    advisorName,
    advisorPhone
  } = req.body;
  if (!userId) {
    return res.status(400).json({ error: "กรุณาระบุ userId" });
  }
  try {
    const profile = await prisma.profile.upsert({
      where: { userId },
      update: {
        firstName,
        lastName,
        gender,
        birthDate: birthDate ? new Date(birthDate) : null,
        nationality,
        religion,
        phone,
        englishLevel,
        internshipStart: internshipStart ? new Date(internshipStart) : null,
        internshipEnd: internshipEnd ? new Date(internshipEnd) : null,
        advisorName,
        advisorPhone
      },
      create: {
        userId,
        firstName,
        lastName,
        gender,
        birthDate: birthDate ? new Date(birthDate) : null,
        nationality,
        religion,
        phone,
        englishLevel,
        internshipStart: internshipStart ? new Date(internshipStart) : null,
        internshipEnd: internshipEnd ? new Date(internshipEnd) : null,
        advisorName,
        advisorPhone
      },
    });
    res.json({ message: "บันทึกโปรไฟล์สำเร็จ", profile });
  } catch (error) {
    res.status(400).json({ error: "เกิดข้อผิดพลาดในการบันทึกโปรไฟล์" });
  }
});

// GET education by userId (เช่น /education?userId=1)
app.get("/education", async (req: Request, res: Response) => {
  const userId = Number(req.query.userId);
  if (!userId) {
    return res.status(400).json({ error: "กรุณาระบุ userId" });
  }
  // ดึง education ล่าสุดของ user (หรือจะใช้ findMany ก็ได้)
  const education = await prisma.education.findFirst({
    where: { userId },
    orderBy: { id: "desc" },
  });
  if (!education) {
    return res.status(404).json({ error: "ไม่พบข้อมูลการศึกษา" });
  }
  res.json(education);
});

// POST/PUT education (สร้างหรืออัปเดตการศึกษา)
app.post("/education", async (req: Request, res: Response) => {
  const {
    userId,
    level,
    school,
    faculty,
    major,
    gpa,
    status
  } = req.body;
  if (!userId || !level || !school) {
    return res.status(400).json({ error: "กรุณากรอกข้อมูลให้ครบถ้วน" });
  }
  try {
    // ถ้ามีข้อมูล education เดิม ให้ update, ถ้าไม่มีก็ create
    const old = await prisma.education.findFirst({ where: { userId } });
    let education;
    if (old) {
      education = await prisma.education.update({
        where: { id: old.id },
        data: { level, school, faculty, major, gpa, status },
      });
    } else {
      education = await prisma.education.create({
        data: { userId, level, school, faculty, major, gpa, status },
      });
    }
    res.json({ message: "บันทึกข้อมูลการศึกษาสำเร็จ", education });
  } catch (error) {
    res.status(400).json({ error: "เกิดข้อผิดพลาดในการบันทึกข้อมูลการศึกษา" });
  }
});

// GET internships ทั้งหมด (แสดงเฉพาะที่ count > 0 หรือ count เป็น null)
app.get("/internships", async (req: Request, res: Response) => {
  try {
    const internships = await prisma.internship.findMany({
      where: {
        OR: [
          { count: { gt: 0 } },
          { count: null } // เผื่อกรณีข้อมูลเก่าไม่มี count
        ]
      },
      orderBy: { id: "desc" }
    });
    res.json(internships);
  } catch (error) {
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการดึงข้อมูลฝึกงาน" });
  }
});

// POST internship (เพิ่มข้อมูลฝึกงานใหม่)
app.post("/internships", async (req: Request, res: Response) => {
  const { office, desc, location, address, count} = req.body;
  if (!office) {
    return res.status(400).json({ error: "กรุณาระบุชื่อสถานที่ฝึกงาน (office)" });
  }
  try {
    const internship = await prisma.internship.create({
      data: { 
        office, 
        desc, 
        location, 
        address, 
        count
      }
    });
    res.json(internship);
  } catch (error) {
    res.status(400).json({ error: "เกิดข้อผิดพลาดในการเพิ่มข้อมูลฝึกงาน" });
  }
});

app.post("/apply-internship", upload.fields([
  { name: "transcript", maxCount: 1 },
  { name: "portfolio", maxCount: 1 }
]), async (req: Request, res: Response) => {
  const { internshipId, about, userId } = req.body;
  const files = req.files as Record<string, Express.Multer.File[]>;
  const transcriptPath = files?.transcript?.[0]?.path;
  const portfolioPath = files?.portfolio?.[0]?.path;
  try {
    // ตรวจสอบว่ามีใบสมัครนี้อยู่แล้วหรือยัง
    const exist = await prisma.internshipApplication.findFirst({
      where: { userId: Number(userId), internshipId: Number(internshipId) }
    });
    if (exist) {
      return res.status(400).json({ error: "คุณได้สมัครฝึกงานนี้ไปแล้ว ไม่สามารถสมัครซ้ำได้" });
    }
    const application = await prisma.internshipApplication.create({
      data: {
        userId: Number(userId),
        internshipId: Number(internshipId),
        about,
        transcript: transcriptPath,
        portfolio: portfolioPath,
      }
    });
    res.json({ message: "สมัครฝึกงานสำเร็จ", application });
  } catch (error) {
    res.status(400).json({ error: "เกิดข้อผิดพลาดในการสมัครฝึกงาน" });
  }
});

// ดึงใบสมัครฝึกงานทั้งหมด
app.get("/internship-applications", async (req: Request, res: Response) => {
  try {
    const applications = await prisma.internshipApplication.findMany({
      include: {
        user: { include: { profile: true } }, // include profile ด้วย
        internship: true
      },
      orderBy: { createdAt: "desc" }
    });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการดึงข้อมูลใบสมัครฝึกงาน" });
  }
});

// ดึงใบสมัครฝึกงานของ user คนเดียว
app.get("/internship-applications/user/:userId", async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);
  try {
    const applications = await prisma.internshipApplication.findMany({
      where: { userId },
      include: { internship: true },
      orderBy: { createdAt: "desc" }
    });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการดึงข้อมูลใบสมัครฝึกงาน" });
  }
});

// ดึงใบสมัครฝึกงานของ internship เดียว
app.get("/internship-applications/internship/:internshipId", async (req: Request, res: Response) => {
  const internshipId = Number(req.params.internshipId);
  try {
    const applications = await prisma.internshipApplication.findMany({
      where: { internshipId },
      include: { user: true },
      orderBy: { createdAt: "desc" }
    });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการดึงข้อมูลใบสมัครฝึกงาน" });
  }
});

app.put("/internship-applications/:id/status", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { status, adminId } = req.body;
  // รองรับ finished และ cancel เพิ่ม
  if (!["accept", "reject", "finished", "cancel"].includes(status)) {
    return res.status(400).json({ error: "สถานะไม่ถูกต้อง" });
  }
  try {
    const updated = await prisma.internshipApplication.update({
      where: { id },
      data: { status },
      include: { user: true, internship: true }
    });

    // ถ้า status เป็น accept ให้ cancel ใบสมัครอื่นของ user เดียวกัน (รวมถึงที่ status == null)
if (status === "accept") {
  await prisma.internshipApplication.updateMany({
    where: {
      userId: updated.userId,
      id: { not: updated.id },
      status: null
    },
    data: { status: "cancel" }
  });
}

    let deletedInternship = false;
    // ถ้ากดรับ ให้ลด count ของ internship ลง 1
    if (status === "accept" && updated.internship && updated.internship.count != null) {
      // อัปเดต count ก่อน แล้วค่อยเช็คและลบ
      const newInternship = await prisma.internship.update({
        where: { id: updated.internship.id },
        data: { count: { decrement: 1 } },
        select: { id: true, count: true }
      });
      if (newInternship.count !== null && newInternship.count <= 0) {
        try {
          await prisma.internship.delete({ where: { id: newInternship.id } });
          deletedInternship = true;
        } catch (e) {
          deletedInternship = true;
        }
      }
    }

    let adminEmail = "lib_trd@mea.or.th";
    if (adminId) {
      const admin = await prisma.user.findUnique({ where: { id: Number(adminId) } });
      if (admin && admin.email) {
        adminEmail = admin.email;
      }
    }
    if (status === "accept") {
      await prisma.mailbox.create({
        data: {
          userId: updated.userId,
          title: "ผลการสมัครฝึกงาน",
          message: `ใบสมัครฝึกงานที่ ${updated.internship.office} ของคุณได้รับการตอบรับแล้ว ให้ส่งเอกสารขอฝึกงานที่ Gmail ${adminEmail}`,
        },
      });
    } else if (status === "reject") {
      await prisma.mailbox.create({
        data: {
          userId: updated.userId,
          title: "ผลการสมัครฝึกงาน",
          message: `ใบสมัครฝึกงานที่ ${updated.internship.office} ของคุณถูกปฏิเสธ`,
        },
      });
    } else if (status === "finished") {
      await prisma.mailbox.create({
        data: {
          userId: updated.userId,
          title: "สถานะฝึกงาน",
          message: `คุณได้ฝึกงานที่ ${updated.internship.office} เสร็จสิ้นแล้ว`,
        },
      });
    } else if (status === "cancel") {
      await prisma.mailbox.create({
        data: {
          userId: updated.userId,
          title: "ผลการสมัครฝึกงาน",
          message: `ใบสมัครฝึกงานที่ ${updated.internship.office} ของคุณถูกยกเลิก`,
        },
      });
    }

    res.json({ ...updated, deletedInternship });
  } catch (error) {
    res.status(400).json({ error: "เกิดข้อผิดพลาดในการอัปเดตสถานะ" });
  }
});

app.get("/mailbox", async (req: Request, res: Response) => {
  const userId = Number(req.query.userId);
  if (!userId) return res.status(400).json({ error: "ต้องระบุ userId" });
  const mails = await prisma.mailbox.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" }
  });
  res.json(mails);
});

app.post("/change-password", async (req: Request, res: Response) => {
  const { userId, oldPassword, newPassword } = req.body;
  if (!userId || !oldPassword || !newPassword) {
    return res.status(400).json({ error: "ข้อมูลไม่ครบถ้วน" });
  }
  const user = await prisma.user.findUnique({ where: { id: Number(userId) } });
  if (!user || user.password !== oldPassword) {
    return res.status(400).json({ error: "รหัสผ่านเดิมไม่ถูกต้อง" });
  }
  await prisma.user.update({
    where: { id: Number(userId) },
    data: { password: newPassword },
  });
  res.json({ message: "เปลี่ยนรหัสผ่านสำเร็จ" });
});

// DELETE internship (ลบข้อมูลฝึกงาน)
app.delete("/internships/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    await prisma.internship.delete({ where: { id } });
    res.json({ message: "ลบข้อมูลฝึกงานสำเร็จ" });
  } catch (error) {
    res.status(400).json({ error: "เกิดข้อผิดพลาดในการลบข้อมูลฝึกงาน" });
  }
});

// PUT internship (แก้ไขข้อมูลฝึกงาน)
app.put("/internships/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { office, desc, location, address, count } = req.body;
  try {
    const updated = await prisma.internship.update({
      where: { id },
      data: { office, desc, location, address, count }
    });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: "เกิดข้อผิดพลาดในการแก้ไขข้อมูลฝึกงาน" });
  }
});

// GET zones ทั้งหมด
app.get("/zones", async (req: Request, res: Response) => {
  try {
    const zones = await prisma.zone.findMany({
      include: { offices: true } // ถ้าอยากได้ office ในแต่ละ zone ด้วย
    });
    res.json(zones);
  } catch (error) {
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการดึงข้อมูล zone" });
  }
});

// POST zone (เพิ่มเขตใหม่)
app.post("/zones", async (req: Request, res: Response) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "กรุณาระบุชื่อเขต (name)" });
  }
  try {
    const zone = await prisma.zone.create({ data: { name } });
    res.json(zone);
  } catch (error) {
    res.status(400).json({ error: "เกิดข้อผิดพลาดในการเพิ่มเขต" });
  }
});

// ส่ง certificate mail ไปยัง mailbox ของ user
app.post("/mailbox/certificate", async (req: Request, res: Response) => {
  const { userId, certificateUrl } = req.body;
  if (!userId || !certificateUrl) {
    return res.status(400).json({ error: "ต้องระบุ userId และ certificateUrl" });
  }
  try {
    const mail = await prisma.mailbox.create({
      data: {
        userId: Number(userId),
        title: "ใบประกาศนียบัตรฝึกงาน",
        message: `ใบประกาศนียบัตร: ${certificateUrl}`,
      },
    });
    res.json({ message: "ส่งใบ certificate สำเร็จ", mail });
  } catch (error) {
    res.status(400).json({ error: "เกิดข้อผิดพลาดในการส่ง certificate" });
  }
});

// เพิ่ม endpoint สำหรับไฟล์ admin
app.post("/admin-files", upload.array("files"), async (req: Request, res: Response) => {
  const files = req.files as Express.Multer.File[];
  if (!files || files.length === 0) return res.status(400).json({ error: "No files uploaded" });
  // save file info to a json file (or db)
  let fileList: any[] = [];
  const fileListPath = "uploads/admin-files.json";
  if (fs.existsSync(fileListPath)) {
    fileList = JSON.parse(fs.readFileSync(fileListPath, "utf8"));
  }
  files.forEach(f => {
    fileList.push({ name: f.originalname, path: f.path });
  });
  fs.writeFileSync(fileListPath, JSON.stringify(fileList, null, 2));
  res.json({ message: "Uploaded", files });
});

app.get("/admin-files", async (req: Request, res: Response) => {
  const fileListPath = "uploads/admin-files.json";
  let fileList: any[] = [];
  if (fs.existsSync(fileListPath)) {
    fileList = JSON.parse(fs.readFileSync(fileListPath, "utf8"));
  }
  res.json(fileList);
});

app.post("/application-files/:applicationId", upload.array("files"), async (req: Request, res: Response) => {
  const applicationId = req.params.applicationId;
  const files = req.files as Express.Multer.File[];
  if (!files || files.length === 0) return res.status(400).json({ error: "No files uploaded" });
  let fileList: any[] = [];
  const fileListPath = `uploads/application-files-${applicationId}.json`;
  if (fs.existsSync(fileListPath)) {
    fileList = JSON.parse(fs.readFileSync(fileListPath, "utf8"));
  }
  files.forEach(f => {
    fileList.push({ name: f.originalname, path: f.path });
  });
  fs.writeFileSync(fileListPath, JSON.stringify(fileList, null, 2));
  res.json({ message: "Uploaded", files });
});

app.get("/application-files/:applicationId", async (req: Request, res: Response) => {
  const applicationId = req.params.applicationId;
  const fileListPath = `uploads/application-files-${applicationId}.json`;
  let fileList: any[] = [];
  if (fs.existsSync(fileListPath)) {
    fileList = JSON.parse(fs.readFileSync(fileListPath, "utf8"));
  }
  res.json(fileList);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
