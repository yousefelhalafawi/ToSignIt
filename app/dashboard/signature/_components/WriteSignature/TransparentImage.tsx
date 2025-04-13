import { Save } from "lucide-react";
import React, { startTransition, useRef, useEffect } from "react";
import styles from "../../_style/signature.module.scss";
import { SaveSignature } from "../../_utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/_redux/store";
import { useRouter } from "next/navigation";

const DownloadableImageWithText = ({ text, color, fontFamily }: any) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { token } = useSelector((state: RootState) => state.authSlice);
  const router = useRouter();
  const dispatch = useDispatch<any>();
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Create a temporary canvas to hold the final signature (transparent background)
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;

    const tempContext = tempCanvas.getContext("2d");
    if (tempContext) {
      // Clear the temporary canvas (transparent)
      tempContext.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
      // Draw our original canvas content onto the temporary canvas
      tempContext.drawImage(canvas, 0, 0);

      // Extract the signature as a Base64-encoded PNG
      const signatureImage = tempCanvas.toDataURL("image/png");
      startTransition(async () => {
        SaveSignature({
          token,
          router,
          payload: {
            userSignature: signatureImage,
          },
          dispatch,
        });
      });
    }
  };

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set a fixed canvas size (customize width/height as needed)
    const canvasWidth = 150;
    const canvasHeight = 150;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Make sure the background is transparent
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Set text styles
    ctx.font = `italic bold 24px ${fontFamily}`;
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Draw the text in the center
    ctx.fillText(text, canvasWidth / 2, canvasHeight / 2);
  };

  useEffect(() => {
    drawCanvas();
  }, [text, color, fontFamily]);

  return (
    <>
      <div className="border rounded mb-3">
        <canvas
          ref={canvasRef}
          style={{ display: "block", margin: "0 auto" }}
        />
      </div>
      <div className="d-flex justify-content-end">
        <button
          onClick={handleDownload}
          className={`${styles.button} ${styles.primary}`}
        >
          <Save />
          Save Signature
        </button>
      </div>
    </>
  );
};

export default DownloadableImageWithText;
