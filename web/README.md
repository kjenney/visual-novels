# Little Red Riding Hood - Visual Novel

A web-based visual novel built with [Pixi’VN](https://pixi-vn.com), telling the classic story of Little Red Riding Hood.

## Development

### Requirements

- Node.js 18+ and npm

### Installation

```bash
npm install
```

### Running in Browser

To run the game in development mode with hot-reload:

```bash
npm run dev
# or
npm start
```

The game will be available at `http://localhost:5173` (or the port shown in your terminal).

### Building for Production

To create a production build:

```bash
npm run build
```

This creates optimized bundles in the `dist` directory.

To preview the production build locally:

```bash
npm run preview
```

## Project Structure

- `src/content/labels/` - Visual novel story scenes and labels
- `src/assets/` - Asset management and manifest
- `src/routes/` - React Router pages
- `public/` - Static assets served at root path

## Learn More

- [Pixi’VN Documentation](https://pixi-vn.com)
- [Pixi’VN GitHub](https://github.com/Dr-Open/pixi-vn)
