import Link from "next/link";
import Button from "./../common/Button";

export default function Error() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">
          An Error has occured
        </h1>
        <Link href="/">
          <Button link="">Go back home</Button>
        </Link>
      </div>
    </div>
  );
}
