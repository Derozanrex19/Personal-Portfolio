# John Wrexel Antopina Portfolio

This repository contains a 3D portfolio experience customized for John Wrexel Antopina. The monitor now loads a local portfolio page built from resume content so the project can be edited and deployed from a single codebase. If you want to customize the inner content further, start with the files in <samp>static/portfolio</samp>.

<br>

To setup a dev environment:

```bash
# Clone the repository

# Install dependencies 
npm i

# Run the local dev server
npm run dev
```

To create a production build:

```bash
# Install dependencies if not already done
# npm i

# Build for production
npm run build
```

This project is now frontend-only. Deploy the generated `public/` directory to any static host.
