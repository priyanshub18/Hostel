import { useEffect, useState } from "react";
import axios from "axios";
export default function AdminRoute() {
  const [hostel, setHostel] = useState("");
  const [data, setData] = useState({});
  const [hostelImages, setHostelImages] = useState([]);
  const [messImage, setMessImage] = useState([]);
  const [message, setMessage] = useState("");
  const [hostelMessage, setHostelMessage] = useState("");
  const [messMessage, setMessMessage] = useState("");

  const handleImageUpload = (event, setImages) => {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = function () {
      console.log(reader.result);
      setImages((prevImages) => [...prevImages, reader.result]);
      console.log(messImage);
      console.log(hostelImages);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };
  useEffect(() => {
    console.log(hostelImages);
  }, [hostelImages]);
  const SaveToDB = async (data) => {
    console.log(data);
    const res = await axios.post("http://localhost:3001/api/admin/data", data);
    console.log(res);
    return res;
  };
  const handleRemoveImage = (index, setImages, images) => {
    setImages(images.filter((_, i) => i !== index));
  };
  // useEffect(() => {
  //   fetch(`http://localhost:3000/api/admin/data?${hostel}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setData(data);
  //     });
  // }, []);
  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto", background: "#fff", boxShadow: "0 0 10px rgba(0,0,0,0.1)", borderRadius: "8px" }}>
      <h1 style={{ fontSize: "32px", fontWeight: "bold", color: "#333", marginBottom: "16px", textAlign: "center" }}>NIT JALANDHAR HOSTEL DASHBOARD</h1>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#333", marginBottom: "16px" }}>Hostel Admin Panel</h1>

      {/* Message Input */}
      <div style={{ marginBottom: "16px" }}>
        <label style={{ display: "block", fontWeight: "bold", marginBottom: "8px" }}>Admin Message</label>
        <textarea placeholder='Type your message here...' style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }} value={message} onChange={(e) => setMessage(e.target.value)} />
      </div>

      {/* Hostel Input */}
      <div style={{ marginBottom: "16px" }}>
        <label style={{ display: "block", fontWeight: "bold", marginBottom: "8px" }}>Name of Hostel</label>
        <select
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
          value={hostel}
          onChange={(e) => setHostel(e.target.value)}
        >
          <option value=''>Select an option...</option>
          <option value='1'>BH1</option>
          <option value='2'>BH2</option>
          <option value='3'>BH3</option>
        </select>
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label style={{ display: "block", fontWeight: "bold", marginBottom: "8px" }}>About Hostel </label>
        <textarea placeholder='Type your message here...' style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }} value={hostelMessage} onChange={(e) => setHostelMessage(e.target.value)} />
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label style={{ display: "block", fontWeight: "bold", marginBottom: "8px" }}>About Mess</label>
        <textarea placeholder='Write about the Mess details Here....' style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }} value={messMessage} onChange={(e) => setMessMessage(e.target.value)} />
      </div>

      {/* Mess Photos Upload Section */}
      <div style={{ marginBottom: "16px" }}>
        <label style={{ display: "block", fontWeight: "bold", marginBottom: "8px" }}>Upload Mess Photos</label>
        <input type='file' accept='image/*' onChange={(e) => handleImageUpload(e, setMessImage)} />
      </div>

      {/* Mess Photos Preview */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
        {messImage.map((img, index) => (
          <div key={index} style={{ position: "relative" }}>
            <img src={img} alt='Mess Photo' style={{ width: "100%", height: "100px", objectFit: "cover", borderRadius: "8px" }} />
            <button onClick={() => handleRemoveImage(index, setMessImage, messImage)} style={{ position: "absolute", top: "5px", right: "5px", background: "red", color: "white", border: "none", borderRadius: "50%", padding: "5px", cursor: "pointer" }}>
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Event Photos Upload Section */}
      <div style={{ marginTop: "20px", marginBottom: "16px" }}>
        <label style={{ display: "block", fontWeight: "bold", marginBottom: "8px" }}>Upload Event Photos</label>
        <input type='file' accept='image/*' multiple onChange={(e) => handleImageUpload(e, setHostelImages)} />
      </div>

      {/* Event Photos Preview */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
        {hostelImages.map((img, index) => (
          <div key={index} style={{ position: "relative" }}>
            <img src={img} alt='Event Photo' style={{ width: "100%", height: "100px", objectFit: "cover", borderRadius: "8px" }} />
            <button onClick={() => handleRemoveImage(index, setHostelImages, hostelImages)} style={{ position: "absolute", top: "5px", right: "5px", background: "red", color: "white", border: "none", borderRadius: "50%", padding: "5px", cursor: "pointer" }}>
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <button
        style={{ marginTop: "20px", background: "#007BFF", color: "white", padding: "10px 20px", border: "none", borderRadius: "4px", cursor: "pointer" }}
        onClick={() => {
          setData({
            message,
            hostelMessage,
            messMessage,
            hostelImages,
            messImage,
            hostel,
          });
          alert("Your data has been submitted successfully");
          SaveToDB(data);
        }}
      >
        Submit
      </button>
    </div>
  );
}
