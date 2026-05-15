# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Gemini setup

If you want the cerita feature to work, create a `.env` file in this folder and add:

```bash
VITE_GEMINI_API_KEY=your_api_key_here
```

You can copy that into `.env.example` and fill in your own key locally.

## Panduan Setup untuk Pemula

Langkah singkat untuk menjalankan proyek ini di komputer Anda (Windows / macOS / Linux):

- 1) Pasang Node.js (pilih versi LTS):
	- Windows: Unduh installer dari https://nodejs.org dan jalankan.
	- macOS: Gunakan Homebrew: `brew install node` atau unduh installer dari situs resmi.
	- Linux (Ubuntu/Debian):
		```bash
		curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
		sudo apt-get install -y nodejs
		```

- 2) Buka terminal, masuk ke folder proyek `belajar-uang`:
	```bash
	cd d:/WebDev/www/mediapemuang/belajar-uang
	```

- 3) Pasang dependensi dan jalankan server dev:
	```bash
	npm install
	npm run dev
	```

- 4) Set `.env` lokal untuk API (jangan commit `.env`):
	- Buat file `.env` di folder `belajar-uang` dan tambahkan:
		```bash
		VITE_GEMINI_API_KEY=your_api_key_here
		```

- 5) Akses aplikasi di browser pada alamat yang ditampilkan oleh `npm run dev` (biasanya `http://localhost:5173`).

Catatan keamanan: Jangan memasukkan API key ke repo publik. Jika key tersebar, segera rotasi/regen di Google Cloud Console.
