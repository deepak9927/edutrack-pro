import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import * as readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

async function main() {
  const rl = readline.createInterface({ input, output });

  const email = await rl.question('Enter admin email: ');
  const password = await rl.question('Enter admin password: ');
  const name = await rl.question('Enter admin name: ');

  rl.close();

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await db.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      role: "ADMIN",
    },
  });

  console.log(`Admin user created with email: ${newUser.email}`);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await db.$disconnect();
  });