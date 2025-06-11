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

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
