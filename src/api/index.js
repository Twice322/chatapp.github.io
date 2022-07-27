// funtioncs which allow to read and write data from or to firestore
import {
  query,
  collection,
  where,
  getDocs,
  addDoc,
  doc,
  orderBy,
  setDoc,
  updateDoc,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase/firebase";

export const getUserById = async (id) => {
  const user = await new Promise((resolve, _) => {
    onSnapshot(doc(db, "users", id), (snapshot) => {
      return resolve(snapshot.data());
    });
  });
  return user;
};
export const getDialogById = async (id) => {
  const dialog = await new Promise((resolve, _) => {
    onSnapshot(doc(db, "dialogs", id), (snapshot) => {
      return resolve(snapshot.data());
    });
  });
  return dialog;
};
export const getMessagesByDialogId = async (id) => {
  return new Promise((resolve, _) => {
    onSnapshot(
      query(
        collection(db, "messages"),
        where("dialog", "==", id),
        orderBy("created_at", "desc")
      ),
      (snapshot) => {
        resolve(snapshot);
      }
    );
  });
};
export const getAllNewMessages = async (dialogId) =>
  await getDocs(
    query(
      collection(db, "messages"),
      where("dialog", "==", dialogId),
      orderBy("created_at")
    )
  );
export const createDialogWithUser = async (authorId, partnerId) => {
  const newDialog = await addDoc(collection(db, "dialogs"), {});
  const author = await getUserById(authorId);
  const partner = await getUserById(partnerId);
  await setDoc(newDialog, {
    conversation: { author, partner },
    created_at: new Date().getTime(),
    id: newDialog.id,
  });
};
export const findUserByUsername = async (username) => {
  return await getDocs(
    query(
      collection(db, "users"),
      where("username", "==", username.toLowerCase())
    )
  );
};
export const createMessageInDialog = async (
  authorId,
  dialogId,
  text,
  attachments
) => {
  const newMessage = await addDoc(collection(db, "messages"), {});
  const author = await getUserById(authorId);
  const message = {
    author: author,
    created_at: new Date().getTime(),
    dialog: dialogId,
    text,
    id: newMessage.id,
    attachments,
    read: false,
  };
  await setDoc(newMessage, message);
  return message;
};
export const updateCurrentDialogLastMessage = async (dialogId, lastMessage) => {
  const dialog = doc(db, "dialogs", dialogId);
  const unreadMessagesCount = await getAllNewMessages(dialogId).then((item) => {
    let counter = 0;
    item.forEach((message) => !message.data().read && ++counter);
    return counter;
  });
  if (unreadMessagesCount > 0) {
    lastMessage = { ...lastMessage, unread: unreadMessagesCount };
    await updateDoc(dialog, { lastMessage });
  }
};
export const uploadFileToStorage = async (file) => {
  const fileRef = ref(storage, file.name);
  await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);
  return photoURL.toString();
};
export const onChangeReadStatus = (dialogId) => {
  return getMessagesByDialogId(dialogId).then(async (data) => {
    if (data.docs.length) {
      data.forEach((item) => {
        if (!item.data().read) {
          const readMessage = { ...item.data(), read: true };
          const message = doc(db, "messages", item.data().id);
          updateDoc(message, readMessage);
        }
      });
      const dialog = await getDialogById(dialogId);
      await updateDoc(doc(db, "dialogs", dialogId), {
        lastMessage: { ...dialog.lastMessage, unread: 0, read: true },
      });
    }
  });
};
export const updateOnlineStatus = async (id, time) => {
  await updateDoc(doc(db, "users", id), {
    lastSeen: time,
  });
};
export const deleteMessageInCurrentDialog = async (messageId) => {
  await deleteDoc(doc(db, "messages", messageId));
};
export const deleteAllMessagesInDialog = async (dialogId) => {
  await getMessagesByDialogId(dialogId).then((messages) => {
    messages.forEach((message) => {
      deleteMessageInCurrentDialog(message.data().id);
    });
  });
};
export const deleteDialog = async (dialogId) => {
  await deleteAllMessagesInDialog(dialogId);
  await deleteDoc(doc(db, "dialogs", dialogId));
};
export const getOnlineStatus = async (partnerId) => {
  const lastLoginTime = (await getUserById(partnerId)).lastSeen;
  return lastLoginTime;
};
