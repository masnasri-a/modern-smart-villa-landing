# Villa Waha - Clean & Maintainable Website

This is a cleaned up and refactored version of the Villa Waha website, separating concerns and improving maintainability.

## Project Structure

```
villa-v2/
├── index-clean.html          # Clean, semantic HTML structure
├── assets/
│   ├── css/
│   │   └── styles.css        # Organized CSS with custom properties
│   └── js/
│       └── script.js         # Modern JavaScript with ES6+ features
├── sources/  # Image assets
└── README.md                 # This file
```

## Features

### HTML Improvements
- ✅ Semantic HTML5 structure
- ✅ Proper heading hierarchy
- ✅ Accessibility improvements (skip links, ARIA labels)
- ✅ Clean, readable markup
- ✅ SEO-friendly structure
- ✅ Responsive image handling

### CSS Improvements
- ✅ Modern CSS with custom properties (CSS variables)
- ✅ Mobile-first responsive design
- ✅ Flexbox and CSS Grid for layouts
- ✅ Smooth animations and transitions
- ✅ Print styles included
- ✅ Organized code structure with comments

### JavaScript Improvements
- ✅ Modern ES6+ JavaScript
- ✅ Class-based architecture
- ✅ Intersection Observer for performance
- ✅ Lazy loading implementation
- ✅ Image gallery with lightbox
- ✅ Accessibility enhancements
- ✅ Performance optimizations

## Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

## Performance Optimizations

1. **Image Optimization**: Native lazy loading with fallback
2. **Critical Resource Preloading**: Important images preloaded
3. **Efficient Event Handling**: Throttled scroll events
4. **Modern CSS**: Hardware-accelerated transitions
5. **Minimal Dependencies**: No external JavaScript libraries

## Accessibility Features

- ✅ Keyboard navigation support
- ✅ Screen reader compatibility
- ✅ Focus management
- ✅ Skip links for main content
- ✅ Proper ARIA labels
- ✅ Color contrast compliance

## Getting Started

1. **Clone or download** the project files
2. **Open `index-clean.html`** in a web browser
3. **For development**: Use a local server (e.g., Live Server extension in VS Code)

## Customization

### Colors
Edit the CSS custom properties in `assets/css/styles.css`:
```css
:root {
    --primary-color: #623e2a;
    --secondary-color: #f4f1ed;
    --accent-color: #244acac;
    /* ... other colors */
}
```

### Typography
Update font families in the CSS variables:
```css
:root {
    --font-primary: 'Open Sans', Helvetica, Arial, sans-serif;
    --font-heading: 'Syne', Helvetica, Arial, sans-serif;
}
```

### Content
- Edit text content directly in `index-clean.html`
- Replace images in the `sources/` directory
- Update contact information in the contact section

## File Sizes (Approximate)
- **Original**: ~7,180 lines in single HTML file
- **Clean HTML**: ~200 lines
- **CSS**: ~600 lines (well-organized)
- **JavaScript**: ~400 lines (feature-rich)

## Key Improvements Made

1. **Separation of Concerns**: HTML, CSS, and JavaScript are in separate files
2. **Semantic Structure**: Proper use of HTML5 semantic elements
3. **Modern CSS**: Using custom properties, Grid, and Flexbox
4. **Performance**: Lazy loading, preloading, and optimized animations
5. **Accessibility**: Full keyboard support and screen reader compatibility
6. **Maintainability**: Clean, commented, and organized code
7. **Responsive Design**: Mobile-first approach with breakpoints
8. **Progressive Enhancement**: Works without JavaScript

## Development Tips

- Use browser dev tools to test responsive design
- Test with keyboard navigation only
- Verify accessibility with screen readers
- Optimize images before adding to the project
- Test on various devices and browsers

## License

This project is provided as-is for Villa Waha. Please respect copyright for images and content.

---

**Note**: This is a cleaned and modernized version of the original Villa Waha website, focused on maintainability, performance, and accessibility.
