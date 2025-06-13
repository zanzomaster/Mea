import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors"; // <--- เพิ่มบรรทัดนี้
import path from "path";
import multer from "multer";

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
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "กรุณากรอกข้อมูลให้ครบถ้วน" });
  }

  try {
    const user = await prisma.user.create({
      data: { name, email, password },
    });
    res.json({ message: "สมัครสมาชิกสำเร็จ", user });
  } catch (error) {
    res.status(400).json({ error: "อีเมลนี้ถูกใช้ไปแล้ว" });
  }
});

app.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "กรุณากรอกข้อมูลให้ครบถ้วน" });
  }
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || user.password !== password) {
    return res.status(401).json({ error: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" });
  }
  res.json({ message: "เข้าสู่ระบบสำเร็จ", user: { id: user.id, name: user.name, email: user.email, role: user.role } });
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
    internshipEnd
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

// GET internships ทั้งหมด
app.get("/internships", async (req: Request, res: Response) => {
  try {
    const internships = await prisma.internship.findMany({
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
        user: true,
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
  const { status } = req.body;
  if (!["accept", "reject"].includes(status)) {
    return res.status(400).json({ error: "สถานะไม่ถูกต้อง" });
  }
  try {
    const updated = await prisma.internshipApplication.update({
      where: { id },
      data: { status },
      include: { user: true, internship: true }
    });

    await prisma.mailbox.create({
      data: {
        userId: updated.userId,
        title: "ผลการสมัครฝึกงาน",
        message:
          status === "accept"
            ? `ใบสมัครฝึกงานที่ ${updated.internship.office} ของคุณได้รับการตอบรับแล้ว ให้ส่งเอกสารขอฝึกงานที่ Email lib_trd@mea.or.th`
            : `ใบสมัครฝึกงานที่ ${updated.internship.office} ของคุณไม่ได้รับการตอบรับ`,
      },
    });

    res.json(updated);
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

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
