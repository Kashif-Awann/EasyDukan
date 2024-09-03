"use client";

import React, { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import auth, { db, storage } from "../../firebase/config";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import ProfilePic from "../../../../public/profile.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

const Profile = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImage(file || null);

    if (!file) return;

    try {
      const storageRef = ref(storage, `profileImages/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // setUploadProgress(Math.round(progress));
        },
        (error) => {
          console.error("Error uploading image:", error);
        },
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          setImageUrl(url);
          // console.log("Image URL:", url);
        }
      );
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      if (user) {
        if (image) {
          const storageRef = ref(storage, `profileImages/${image.name}`);
          const uploadTask = uploadBytesResumable(storageRef, image);

          // Handle the completion of the upload task and setting the document in Firestore
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              setLoading(true);
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setUploadProgress(Math.round(progress));
            },
            (error) => {
              console.error("Error uploading image:", error);
            },
            async () => {
              const url = await getDownloadURL(uploadTask.snapshot.ref);
              setImageUrl(url);

              const userDoc = {
                firstName,
                lastName,
                phoneNumber,
                imageUrl: url,
              };

              await setDoc(doc(db, "Users", user.uid), userDoc);
              router.push("/dashboard");
            }
          );
        } else {
          const userDoc = {
            firstName,
            lastName,
            phoneNumber,
            imageUrl,
          };

          await setDoc(doc(db, "Users", user.uid), userDoc);
          router.push("/dashboard");
        }
      }
    } catch (error) {
      console.error("Error saving profile data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-start">
      <div className="h-[188px] w-full bg-[#FF8D83]">
        <h2 className="text-xl font-bold text-center pt-9 font-source-sans">
          Edit Profile
        </h2>
      </div>
      <div className="mx-auto h-[142px] w-[142px] border border-sky-100 rounded-full mt-[-90px] z-10 bg-gray-100 flex items-center justify-center overflow-hidden">
        <div style={{ width: "142px", height: "142px", position: "relative" }}>
          <Image
            src={imageUrl ? imageUrl : ProfilePic} //URL.createObjectURL(imageUrl)
            alt="Profile"
            width={142}
            height={142}
            priority
            className="rounded-full"
          />
        </div>
      </div>
      <div className="flex w-full justify-center p-2">
        {uploadProgress ? (
          <Box sx={{ width: "20%" }}>
            <LinearProgress variant="determinate" value={uploadProgress} />
          </Box>
        ) : (
          ""
        )}
      </div>
      <div className="mx-auto rounded px-8 pt-6 pb-8 mb-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                htmlFor="first-name"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >
                First Name:
              </label>
              <input
                type="text"
                id="first-name"
                name="first-name"
                placeholder="Abdul"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="appearance-none custom-input-style block w-full text-gray-700 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                required
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                htmlFor="last-name"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >
                Last Name:
              </label>
              <input
                type="text"
                id="last-name"
                name="last-name"
                placeholder="Wahab"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="appearance-none block w-full text-gray-700 custom-input-style py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                required
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                htmlFor="phone-number"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >
                Phone Number:
              </label>
              <input
                type="tel"
                id="phone-number"
                name="phone-number"
                pattern="[0-9]{11}"
                placeholder="0344-4445555"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="appearance-none block w-full text-gray-700 custom-input-style py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                required
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                htmlFor="profile-image"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >
                Upload Image:
              </label>
              <input
                type="file"
                id="profile-image"
                name="profile-image"
                onChange={handleImageUpload}
                className="appearance-none block w-full text-gray-700 custom-input-style py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
            </div>
          </div>
          {/* {imageUrl && (
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <img src={imageUrl} alt="Profile Preview" className="rounded-lg" style={{ maxWidth: '100%', height: 'auto' }} />
          </div>
        </div>
      )} */}
          <div className="text-center pt-10">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#FF8D83] hover:bg-[#fa5d4e] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
            {uploadProgress > 0 && (
              <p className="text-lg">Upload is {uploadProgress}% done</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
