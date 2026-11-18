# ClassIQ

## Run the project

This is a static HTML, CSS, and JavaScript project. Tailwind utilities are compiled to the checked-in `styles.css`, so the pages do not need Tailwind's Play CDN at runtime.

From the project folder, start a local server:

```powershell
py -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000) in a browser. The courses catalog is at `/courses/`; login and signup are at `/login` and `/signup`. Stop the server with `Ctrl+C`.

You can also open `index.html` directly, but a local server is recommended for JavaScript modules.

## Tools and libraries

- HTML, CSS, and JavaScript
- Compiled Tailwind CSS
- Self-hosted Poppins fonts (SIL Open Font License)
- Lenis for smooth scrolling
- Motion for page animations
- Python's built-in HTTP server for local preview

Only the optional Lenis and Motion animations need an internet connection. Login, signup, and newsletter forms validate input in the browser; this static site does not submit form data to a backend.

To rebuild the compiled stylesheet after changing Tailwind classes, run:

```powershell
npx tailwindcss@3.4.17 -i .\tailwind.input.css -o .\styles.css --minify
```

The Tailwind source scan is configured in `tailwind.config.js`.

## Keyboard shortcuts

There are no custom keyboard shortcuts.
