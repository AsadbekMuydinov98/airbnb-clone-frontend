export default function Image({src,...rest}) {
  src = src && src.includes('https://')
    ? src
    : 'https://airbnb-clone-backend-2y3a.onrender.com/uploads/'+src;
  return (
    <img {...rest} src={src} alt={''} />
  );
}
// 'http://localhost:5000/uploads/'
