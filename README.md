## 🚀 How To Run Project

1. `npm install` - Install dependencies.
2. `npm run start` - Start the project. Visit http://localhost:5173/
3. `npm run build` - Build the project.
4. `npm run lint` - Run ESLint.
5. `npm run format` - Run Prettier.
6. `npm run test` - Run tests.
7. `docker:dev:build` - Build the Docker image for development
8. `docker:dev` - Run the Docker container for development. Visit http://localhost:5173/
9. `docker:prod:build` - Build the Docker image for production.
10. `docker:prod` - Run the Docker container for production. Visit http://localhost:80/folders-tree/

**For more scripts please check package.json**

**🎉 You can view the deployed website here:**
https://ikh00000.github.io/folders-tree/

## 👨‍💻 How Create Tree Logic Works

### Rule 1: Empty Values

An empty array, an array with an empty string, or an array with only a forward slash will return nothing.

1. `[]` - Nothing to show.
2. `[""]` - Nothing to show.
3. `["/"]` - Nothing to show.

### Rule 2: File vs. Folde

- If a path ends with a forward slash, it is considered a folder (whether it has content or is empty).
- If it does not end with a forward slash, it is considered a file.

1. `["/path"]` - File.
2. `["path"]` - File.
3. `["/path/"]` - Folder (empty).
4. `["path/"]` - Folder (empty).

### Rule 3: Modifying Paths

Paths can be modified, but there are some rules to follow:

1. `["/folder/", "/folder/file"]` - Files and folders can be added to a folder.
2. `["/folder/file", "/folder/"]` - Files and folders cannot be removed from a folder in this manner (i.e., a file can become a folder, but a folder cannot become a file).
3. `["/path", "/path/"]` - If `"path"` was previously a file, it can now be a folder.
4. `["/path/abc", "/path"]` - If `"path"` was previously a folder, it cannot be a file. In this case, `"/path"` will be ignored.
5. `["/path/file", "/paths/file"]` - Duplicates are allowed but will be ignored.
   - **Note:** We do not validate for duplicate file or folder names. While validation might seem useful, it could introduce complications (for example, how to show the user the correct location of the duplicate, what to do with other paths at this time, etc.). This would be a great feature if we were adding one path at a time, rather than an array of paths at once. Please refer to the rules above to understand how modifications work.
