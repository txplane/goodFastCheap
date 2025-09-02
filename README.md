# Good, Fast, Cheap - Pick Two

An interactive web demonstration of the classic project management triangle principle: "Good, Fast, Cheap - you can only have two."

## 🎯 Live Demo

Experience the interactive triangle and see real-world trade-offs in action.

## 📖 About

This project visualizes the fundamental constraint in project management known as the "Iron Triangle" or "Project Triangle." The principle states that for any project, you can optimize for two of these three qualities, but never all three simultaneously:

- **Good** (High Quality) - Premium materials, expert craftsmanship, thorough testing
- **Fast** (Quick Delivery) - Tight deadlines, rapid turnaround, immediate results  
- **Cheap** (Low Cost) - Budget-friendly, cost-effective, minimal expense

## ✨ Features

- **Interactive Triangle Interface** - Click vertices or use checkboxes to select priorities
- **Real-time Feedback** - Instant explanations of trade-offs and implications
- **Smart Constraints** - Automatically enforces the "pick only 2" rule
- **Industry Examples** - Real-world scenarios from software, manufacturing, and consulting
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Visual Animations** - Smooth transitions and particle effects for engagement

## 🚀 Deployment Options

### Option 1: Multi-file Structure
```
index.html    # Main HTML structure
style.css     # Styling and animations
script.js     # Interactive functionality
```

### Option 2: Single File
```
single-file.html  # Everything embedded in one file
```

### AWS S3 Static Hosting

1. **Create S3 bucket:**
   ```bash
   aws s3 mb s3://your-unique-bucket-name
   ```

2. **Upload files:**
   ```bash
   # Multi-file option
   aws s3 sync . s3://your-bucket-name --exclude ".git/*" --exclude ".gitignore"
   
   # Single-file option  
   aws s3 cp single-file.html s3://your-bucket-name/index.html
   ```

3. **Enable static hosting:**
   ```bash
   aws s3 website s3://your-bucket-name --index-document index.html
   ```

4. **Make public** (set bucket policy for public read access)

## 🛠 Technology Stack

- **HTML5** - Semantic structure and accessibility
- **CSS3** - Modern styling with CSS Grid, Flexbox, and animations
- **Vanilla JavaScript** - Pure JS with no dependencies
- **Responsive Design** - Mobile-first approach

## 🎨 Design Features

- Glass-morphism effects with backdrop blur
- Gradient backgrounds and smooth animations
- Color-coded attribute system (Green=Good, Blue=Fast, Orange=Cheap)
- Particle animation background
- Pulse animations for selected states
- Hover effects and micro-interactions

## 📱 Browser Support

Works in all modern browsers:
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🤝 Use Cases

Perfect for:
- **Project Managers** - Explaining constraints to stakeholders
- **Consultants** - Setting realistic client expectations  
- **Educators** - Teaching project management principles
- **Teams** - Aligning on project priorities and trade-offs

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Related Concepts

- Project Management Triangle
- Iron Triangle
- Triple Constraint
- Scope-Time-Cost Trade-offs