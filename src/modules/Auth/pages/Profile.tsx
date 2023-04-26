import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import { AuthActions } from "../../../app/Redux/Auth.slice";
import { getUser as getUserAPI, updateUser } from "../../../api/User.api";
import { clearAccesTokenLST } from "../../../Utils/Token";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { generateAvatarUpload } from "../../../Utils/UploadImage";
import { APIUrl } from "../../../Utils/path";
import { toast } from "react-toastify";

const Profile = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.auth.user);
  //
  // const location = useLocation();
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<any>(null);
  const [image, setImage] = useState(user?.avatar);
  const [crop, setCrop] = useState<any>({
    unit: "%",
    x: 0,
    y: 0,
    width: 100,
    height: 50,
  });
  const [completedCrop, setCompletedCrop] = useState<any>(null);
  const [openModal, setOpenModal] = useState(false);
  const previewCanvasRef = useRef<any>(null);

  const changeAvatar = () => {
    if (avatarInputRef.current !== null) avatarInputRef.current.click();
  };
  const onChooseAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as any);
    };
    if (files !== null && files.length) reader.readAsDataURL(files[0]);
    setOpenModal(true);
  };
  const onLoad = useCallback((img: any) => {
    imgRef.current = img;
  }, []);
  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );
  }, [completedCrop]);
  const uploadAvatar = async () => {
    const file = await generateAvatarUpload(
      previewCanvasRef.current,
      completedCrop
    );
    if (file) {
      const json = updateUser(file);
      json
        .then((res: any) => {
          setOpenModal(false);
          getUser();
        })
        .catch((err: any) => {
          setOpenModal(false);
          toast.error("Request Entity Too Large");
        });
    }
  };
  //
  const getUser = useCallback(() => {
    const json = getUserAPI();
    json.then((res: any) => {
      dispatch(AuthActions.getUser(res.data.data));
    });
  }, [dispatch, user]);
  useEffect(() => {
    getUser();
  }, []);
  const handleLogout = () => {
    clearAccesTokenLST();
    dispatch(AuthActions.logout());
  };
  return (
    <>
      <div className="flex justify-center m-auto w-full mt-10 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col items-center py-10">
          <div className="profilepic">
            <img
              src={`${APIUrl}/${user?.avatar}`}
              className="card-img-top profilepic__image"
              alt="avatar_url"
            />
            {/* {location.pathname === ROUTER.profile && ( */}
            <div className="profilepic__content" onClick={changeAvatar}>
              <input
                ref={avatarInputRef}
                hidden
                type="file"
                onChange={onChooseAvatar}
                accept="image/*"
              />
              <span className="profilepic__text">Upload Avatar</span>
            </div>
            {/* )} */}
          </div>
          {/* <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
          src="https://plus.unsplash.com/premium_photo-1679692887555-f82351217721?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80s"
        /> */}
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            Name: Tú Lê
          </h5>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <strong>Email: </strong>
            {user?.email}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <strong>Gender: </strong>
            {user?.gender}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <strong>Region:</strong>
            {user?.region}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <strong>State: </strong>
            {user?.state}
          </p>
          <div className="flex mt-4 space-x-3 md:mt-6">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => handleLogout()}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      {openModal && (
        <div
          style={{
            transform: "translate(-50%)",
            left: "50%",
          }}
          className="fixed z-50 p-4 md:inset-0 overflow-scroll"
        >
          <div className="relative w-full max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 p-10">
              <h2 className="font-bold text-center">Update avatar</h2>
              <ReactCrop
                style={{
                  width: "300px",
                  height: "300px",
                  margin: "0 auto",
                  display: "flex",
                }}
                src={image ? image : ""}
                crop={crop}
                onChange={(newCrop: any) => {
                  setCrop(newCrop);
                }}
                onImageLoaded={onLoad}
                onComplete={(c) => setCompletedCrop(c)}
              />
              <h2>Ảnh được chọn</h2>
              <canvas
                ref={previewCanvasRef}
                style={{
                  width: Math.round(completedCrop?.width ?? 0),
                  height: Math.round(completedCrop?.height ?? 0),
                  margin: "0 auto",
                }}
              />
              <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => {
                    uploadAvatar();
                  }}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  onClick={() => {
                    setOpenModal(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Profile;
