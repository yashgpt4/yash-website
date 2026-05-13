# Terminal Guide for Non-Techies

Confused about Terminal? This guide explains what Terminal is and exactly what to type.

---

## What is Terminal?

Terminal is a text-based way to control your Mac. Instead of clicking buttons, you type commands.

**Think of it like:**
- Finder = graphical file explorer (you click folders)
- Terminal = text-based file explorer (you type commands)

---

## How to Open Terminal

1. Press **Cmd + Space** (spotlight search)
2. Type: `terminal`
3. Press **Enter**

A black/white window appears. This is Terminal.

---

## Basic Terminal Rules

### 1. Typing Commands

When you see this in a guide:

```bash
npm install
```

**What to do:**
1. Type exactly: `npm install`
2. Press **Enter**

That's it!

### 2. Copy/Paste from Guides

**To copy from this guide:**
1. Select the text (click and drag)
2. Press **Cmd+C**

**To paste into Terminal:**
1. Press **Cmd+V**

### 3. Reading Output

Terminal prints messages after each command. Examples:

✅ **Good output:**
```
added 123 packages in 45s
```

❌ **Error output:**
```
command not found: npm
```

If you see "command not found," you're missing software (ask for help).

### 4. Waiting for Commands

Some commands take time. Don't close Terminal—wait for the cursor to return:

```bash
$ npm install
   ... (lots of text appears) ...
$ 
```

When you see `$` again, you can type the next command.

---

## Essential Commands for This Project

### Navigate to Your Project

```bash
cd ~/Documents/Claude/Projects/yash\ Portfolio\ 🧃
```

**What it means:** "Change Directory to my project folder"

**Important notes:**
- The backslashes `\ ` are important—they tell Terminal spaces are part of the folder name
- The emoji `🧃` at the end is part of the folder name (copy and paste if needed)

### Verify You're in the Right Place

```bash
pwd
```

**What it means:** "Print Working Directory" (where are you right now?)

**You should see:**
```
/Users/yash/Documents/Claude/Projects/yash Portfolio
```

### See What Files are Here

```bash
ls
```

**What it means:** "List" all files and folders in this location.

**You should see:**
```
README.md
SETUP_GUIDE.md
app
components
lib
...
```

---

## Git Commands (Creating SSH Keys & Pushing Code)

### Generate SSH Key

```bash
ssh-keygen -t ed25519 -C "yashvijaykar98@gmail.com"
```

**What it does:** Creates a secure "key pair" (public + private) so GitHub recognizes your Mac.

**You'll be asked:**

```
Enter file in which to save the key (/Users/yash/.ssh/id_ed25519):
```

Just press **Enter** (use the default location).

```
Enter passphrase (empty for no passphrase):
```

Press **Enter twice** (no passphrase for simplicity).

### Copy SSH Key to Clipboard

```bash
cat ~/.ssh/id_ed25519.pub | pbcopy
```

**What it does:** Takes your public SSH key and copies it to your clipboard.

**Next step:** Paste it into GitHub settings (Cmd+V in your browser).

### Tell Git Your Name

```bash
git config --global user.name "Yash Vijaykar"
git config --global user.email "yashvijaykar98@gmail.com"
```

**What it does:** Tells Git who's making changes.

### Initialize Git in Your Project

```bash
git init
```

**What it does:** Turns your project folder into a Git repository (ready to track changes).

### Connect to GitHub

```bash
git remote add origin git@github.com:yashgpt4/yash-website.git
```

**What it does:** Links your local folder to your GitHub repository.

**Important:** Replace `yashgpt4` with your actual GitHub username if different.

### Verify Connection Works

```bash
git remote -v
```

**You should see:**
```
origin  git@github.com:yashgpt4/yash-website.git (fetch)
origin  git@github.com:yashgpt4/yash-website.git (push)
```

✅ Connected!

### Stage Your Files

```bash
git add .
```

**What it does:** Tells Git "I want to upload all these files."

The `.` means "everything."

### Create a Commit (Snapshot)

```bash
git commit -m "Initial commit: yashvijaykar.com MVP"
```

**What it does:** Creates a snapshot of all your files with a message.

**The message** (`-m`) is what you write about your changes.

### Push to GitHub

```bash
git push -u origin main
```

**What it does:** Uploads your files to GitHub.

**First time**, you may see:

```
The authenticity of host 'github.com' can't be established.
...
Are you sure you want to continue connecting (yes/no)?
```

Type: `yes` and press Enter.

**Success looks like:**
```
Counting objects: 31, done.
Compressing objects: 100% (25/25), done.
Writing objects: 100% (31/31), 500 KiB
...
branch 'main' set up to track 'origin/main'
```

---

## npm Commands (Install & Run)

### Install Dependencies

```bash
npm install
```

**What it does:** Downloads all the libraries your project needs.

**Takes 2-3 minutes.** Wait for `added XXX packages` at the end.

### Run Development Server

```bash
npm run dev
```

**What it does:** Starts a local server so you can see your site at `http://localhost:3000`.

**You'll see:**
```
▲ Next.js 14.0.0
- Local:        http://localhost:3000
```

**To stop it:** Press **Ctrl+C**

### Build for Production

```bash
npm run build
```

**What it does:** Prepares your site for real deployment.

---

## Common Mistakes & Fixes

### Mistake: "command not found: npm"

**Cause:** Node.js not installed.

**Fix:** Download from [nodejs.org](https://nodejs.org) and install.

Then close Terminal and open a new one.

### Mistake: "Permission denied" or "You do not have permission"

**Cause:** You're in the wrong folder or don't have write permission.

**Fix:** 
```bash
pwd
```

Check you're in the right place. Then try the command again.

### Mistake: SSH key not working with GitHub

**Cause:** SSH key not added to GitHub, or GitHub using wrong key.

**Fix:** 
1. Go to [github.com/settings/keys](https://github.com/settings/keys)
2. Delete any old keys
3. Generate a new SSH key (see instructions above)
4. Add it to GitHub

### Mistake: Terminal shows "fatal: not a git repository"

**Cause:** You're not in a git-initialized folder.

**Fix:**
```bash
cd ~/Documents/Claude/Projects/yash\ Portfolio
git init
```

---

## Useful Terminal Tips

### See Your Command History

Press the **up arrow** key to see commands you've typed before. Keep pressing to go further back.

### Auto-Complete Folder Names

Type the first few letters and press **Tab**. Terminal will complete the folder name if it can find it.

```bash
cd ~/Doc  # press Tab
# becomes: cd ~/Documents/
```

### Clear the Screen

```bash
clear
```

Clears all old text. Good for reducing clutter.

### Check if a Program is Installed

```bash
which npm
which node
which git
```

If the command prints a path, it's installed. If nothing prints, it's not installed.

---

## Getting Help

**Still confused?**

1. Check this guide again
2. Read [`SETUP_GUIDE.md`](../SETUP_GUIDE.md) (it explains everything in order)
3. Check the exact error message—paste it into Google
4. Email: yashvijaykar98@gmail.com

---

## Cheat Sheet (Copy & Paste)

Here are the exact commands in order for this project:

```bash
# 1. Navigate to project (note the emoji 🧃 at the end)
cd ~/Documents/Claude/Projects/yash\ Portfolio\ 🧃

# 2. Generate SSH key (press Enter twice when prompted)
ssh-keygen -t ed25519 -C "yashvijaykar98@gmail.com"

# 3. Copy SSH key to clipboard
cat ~/.ssh/id_ed25519.pub | pbcopy

# (Paste into GitHub settings now)

# 4. Configure Git
git config --global user.name "Yash Vijaykar"
git config --global user.email "yashvijaykar98@gmail.com"

# 5. Initialize Git
git init
git remote add origin git@github.com:yashgpt4/yash-website.git

# 6. Install dependencies
npm install

# 7. Copy environment file
cp .env.local.example .env.local

# (Edit .env.local with your Supabase credentials)

# 8. Run locally
npm run dev

# 9. Push to GitHub (in a new Terminal window, Cmd+N)
git add .
git commit -m "Initial commit: yashvijaykar.com MVP"
git push -u origin main
```

---

**You've got this! 💪**
