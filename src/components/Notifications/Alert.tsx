import { AnimatePresence, motion } from "framer-motion";

const Alert: React.FC<{
  showNotification: boolean;
  errorHappened: boolean;
  notificationMessage: string;
  setshowNotification: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({
  showNotification,
  errorHappened,
  notificationMessage,
  setshowNotification,
}) => {
  return (
    <AnimatePresence>
      {showNotification && (
        <motion.div
          className="fixed z-20 top-6 m-0 bottom-auto w-full flex justify-center align-center items-center content-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            onClick={() => {
              setshowNotification(false);
            }}
            className={`${
              errorHappened ? "bg-red-800" : "bg-green-800"
            } rounded-lg p-4 cursor-pointer text-center shadow-lg shadow-black`}
          >
            <span>
              {errorHappened ? (
                <strong> ❌ ERROR - </strong>
              ) : (
                <strong> ✅ SUCCESS - </strong>
              )}
              {notificationMessage}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Alert;
