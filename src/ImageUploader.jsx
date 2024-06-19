import  { useState } from 'react';

const ImageUploader = () => {
  const [image, setImage] = useState(null); // State to store the selected image file

  // Function to handle file upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0]; // Access the uploaded file
    if (file) {
      const reader = new FileReader(); // Create a FileReader object
      reader.onloadend = () => {
        setImage(reader.result); // Set the result as the source of the image
      };
      reader.readAsDataURL(file); // Read the file as a data URL format
    }
  };

  return (
    <div>
      {/* Input element for file upload */}
      <input type="file" accept="image/*" onChange={handleImageUpload} />

      {/* Display the preview of the selected image */}
      {image && (
        <div className='preview'>
          <h2>Preview:</h2>
          <img src={image} alt="Preview" style={{ maxWidth: '100%', maxHeight: '300px' }} />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;