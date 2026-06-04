const AuthCheckLoadingUI = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="mt-4 text-gray-600 capitalize font-bold text-2xl">
          Checking authentication...
        </p>
      </div>
    </div>
  );
};

export default AuthCheckLoadingUI;
