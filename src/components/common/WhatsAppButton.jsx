import React from "react";

const WhatsAppButton = () => {
  const phoneNumber = "919876543210"; // 👉 apna number dal (without + sign)
  const message = "Hi, I want your services.";

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div style={styles.container} onClick={handleClick}>
      <img
        src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
        alt="WhatsApp"
        style={styles.icon}
      />
    </div>
  );
};

const styles = {
  container: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    // backgroundColor: "#25D366",
    borderRadius: "50%",
    padding: "12px",
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
    zIndex: 1000,
  },
  icon: {
    width: "40px",
    height: "40px",
  },
};

export default WhatsAppButton;