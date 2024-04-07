import { Alert, Button, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  updateFailure,
  updateStart,
  updateSuccess,
} from "../redux/userSlice/userSlice.js";

const DashProfile = () => {
  const api_url = "http://localhost:8000/api";
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadingProgress, setImageFileUploadingProgress] =
    useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [formData, setFormData] = useState({});

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    /*  rules_version = '2';

        // Craft rules based on data in your Firestore database
        // allow write: if firestore.get(
        //    /databases/(default)/documents/users/$(request.auth.uid)).data.isAdmin;
        service firebase.storage {
          match /b/{bucket}/o {
            match /{allPaths=**} {
              allow read: if true;
              allow write: if 
              request.resource.size < 2 *1024 *1024 && 
              request.resource.contentType.matches("image/.*")
              ;
            }
          }
        } */
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadingProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          "Could not upload image (File must be less than 2 megabytes)"
        );
        setImageFileUploadingProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
      },

      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
        });
      }
    );
  };

  if (imageFileUploadingProgress == 100) {
    setTimeout(() => {
      setImageFileUploadingProgress(null);
    }, 2000);
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0) {
      return;
    }

    try {
      dispatch(updateStart());
      const res = await fetch(`${api_url}/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch(updateFailure(data.message));
      } else {
        dispatch(updateSuccess(data));
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
    }
  };
  return (
    <div className=" max-w-lg mx-auto p-3 w-full">
      <h3 className="my-7 text-center font-semibold text-3xl">Profile</h3>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          id="fileInput"
          className="hidden"
        />
        <div className=" relative w-36 h-36 rounded-full self-center cursor-pointer shadow-md">
          <label htmlFor="fileInput" className="cursor-pointer">
            {imageFileUploadingProgress && (
              <CircularProgressbar
                value={imageFileUploadingProgress || 0}
                text={`${imageFileUploadingProgress}%`}
                strokeWidth={3}
                styles={{
                  root: {
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                  },
                  path: {
                    stroke: `rgba(62, ${
                      imageFileUploadingProgress < 100
                        ? imageFileUploadingProgress
                        : imageFileUploadingProgress + 155
                    }, 199, ${imageFileUploadingProgress / 100})`,
                  },
                }}
              />
            )}
          </label>
          <label htmlFor="fileInput" className=" cursor-pointer">
            <img
              src={imageFileUrl || currentUser.profilePicture}
              alt={currentUser ? currentUser.username : "profile picture"}
              className="rounded-full w-full h-full border-4 object-cover border-[lightgrey] cursor-pointer"
            />
          </label>
        </div>
        {imageFileUploadError && (
          <Alert color={"failure"}>{imageFileUploadError} </Alert>
        )}

        <div className="flex flex-col gap-4 mt-4">
          <TextInput
            type="text"
            id="username"
            placeholder="Username"
            defaultValue={currentUser.username}
            onChange={handleChange}
          />
          <TextInput
            type="email"
            id="email"
            placeholder="Email"
            defaultValue={currentUser.email}
            onChange={handleChange}
          />
          <TextInput
            type="password"
            id="password"
            placeholder="Password"
            onChange={handleChange}
          />
        </div>
        <Button
          type="submit"
          className="mt-4"
          gradientDuoTone={"purpleToBlue"}
          outline
        >
          Change Profile
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span className=" cursor-pointer">Delete Account</span>
        <span className=" cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
};

export default DashProfile;
