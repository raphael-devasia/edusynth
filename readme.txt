# 🤝 Project Collaboration Guide

This guide outlines our team's workflow for collaborating on this project using Git. Following these steps ensures a smooth development process and helps us avoid conflicts.

---

## 🚀 Git Workflow for Team Collaboration

### 1. Clone the Repository

To get started, clone the project to your local machine and navigate into the folder.

```bash
git clone <repo_url>
cd <repo_folder>
2. Create a New Branch
Always work on a dedicated branch for your specific task. This keeps the main branch clean and stable. Use a descriptive name that follows our naming conventions (e.g., feature/, fix/).

Bash

git checkout -b feature/add-user-login
3. Make Changes and Commit
After making your changes, stage them and write a clear, concise commit message.

Bash

git add .
git commit -m "feat: Added user login functionality"
4. Push Your Branch
Once your work is ready, push your branch to the remote repository.

Bash

git push origin feature/add-user-login
After pushing, create a Pull Request (PR) on GitHub. Another team member will review your code, and once approved, it can be merged into main.

🔄 Keeping Your Local Repository Updated
5. Syncing with the Main Branch
To ensure you're always working with the latest code, it's a good practice to update your local main branch before you start working each day.

Bash

git checkout main
git pull origin main
Before pushing your own changes, it's also crucial to pull the latest updates to avoid conflicts.

Bash

git pull origin main
🚫 Handling Merge Conflicts
6. Resolving Conflicts
Merge conflicts happen when two developers edit the same lines of code in different ways. Git will mark these conflicts in the file.

Look for the conflict markers in your code:

Plaintext

<<<<<<< HEAD
// Your version of the code
=======
// Their version of the code
>>>>>>> branch_name
To resolve the conflict, you'll need to manually edit the file to keep the correct code and remove the markers.

After fixing the file, stage and commit the changes to finalize the merge.

Bash

git add <file>
git commit
git push
✅ Team Rules & Best Practices
Branching Strategy: Use descriptive branch names. Prefixes like feature/, fix/, and hotfix/ are a great way to categorize your work.

Don't Push to Main: Never push directly to the main branch. All changes must go through a Pull Request.

Use .gitignore: Add files and folders that shouldn't be tracked by Git (e.g., node_modules, temporary files) to the .gitignore file.

Task Management: Use GitHub Issues or Projects to keep track of tasks, bugs, and feature requests.

Code Reviews: Take your time to review your teammates' code. Provide constructive feedback to help everyone improve.