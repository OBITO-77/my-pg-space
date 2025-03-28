import User from "../models/user.model.js";
import Message from "../models/message.model.js";

//import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    // if (image) {
    //   // Upload base64 image to cloudinary
    //   const uploadResponse = await cloudinary.uploader.upload(image);
    //   imageUrl = uploadResponse.secure_url;
    // }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// import Message from "../models/message.js";
// import User from "../models/User.js";

// /**
//  * @desc Send a new message
//  * @route POST /api/messages
//  */
// export const sendMessage = async (req, res) => {
//   try {
//     const { senderId, receiverId, text, image } = req.body;

//     // Check if both users exist
//     const sender = await User.findById(senderId);
//     const receiver = await User.findById(receiverId);

//     if (!sender || !receiver) {
//       return res.status(404).json({ message: "Sender or receiver not found" });
//     }

//     // Create a new message
//     const message = new Message({ senderId, receiverId, text, image });
//     await message.save();

//     res.status(201).json({ message: "Message sent successfully", message });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// /**
//  * @desc Get all messages between two users
//  * @route GET /api/messages/:senderId/:receiverId
//  */
// export const getMessages = async (req, res) => {
//   try {
//     const { senderId, receiverId } = req.params;

//     const messages = await Message.find({
//       $or: [
//         { senderId, receiverId },
//         { senderId: receiverId, receiverId: senderId },
//       ],
//     }).sort({ createdAt: 1 });

//     res.status(200).json(messages);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// /**
//  * @desc Delete a specific message
//  * @route DELETE /api/messages/:messageId
//  */
// export const deleteMessage = async (req, res) => {
//   try {
//     const { messageId } = req.params;

//     const message = await Message.findByIdAndDelete(messageId);

//     if (!message) {
//       return res.status(404).json({ message: "Message not found" });
//     }

//     res.status(200).json({ message: "Message deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };
