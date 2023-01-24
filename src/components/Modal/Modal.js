export const Modal = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;

  const handleClick = (e) => {
    if (e.target.id === "wrapper") onClose();
  };

  return (
    <div
      id="wrapper"
      onClick={handleClick}
      className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
    >
      <div className={`bg-white p-4 md:p-6 rounded-lg mx-3 md:mx-4`}>
        {/* Content */}
        {children}
      </div>
    </div>
  );
};
