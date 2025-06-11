import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors"; // <--- เพิ่มบรรทัดนี้

const app = express();
const prisma = new PrismaClient();

app.use(cors()); // <--- เพิ่มบรรทัดนี้
app.use(express.json());

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

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
