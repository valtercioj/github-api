import { useParams } from "react-router-dom";
import { IDataUser, IReposityProps } from "./types";
import { AiFillGithub, AiOutlineStar } from "react-icons/ai";
import { useQuery } from "react-query";
import api from "../../services/api";
import { toast } from "react-toastify";
export default function index() {
  const { user } = useParams();
  const {
    data: dataUser,
    isLoading: isLoadingData,
    isError: isErrorUser,
  } = useQuery<IDataUser>("user", async () => {
    const response = await api.get(`/users/${user}`);
    if (response.status !== 200) {
      () => {
        toast.error("Usuário não encontrado", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      };
    }
    return response.data;
  });

  const {
    data: repositories,
    isLoading: isLoadingRepos,
    isError: isErrorRepos,
  } = useQuery<IReposityProps[]>("repos", async () => {
    const response = await api.get(`/users/${user}/repos`);
    return response.data;
  });
  return (
    <div
      className="relative w-full h-screen md:flex dark:bg-gray-dark"
      data-dev-hint="container"
    >
      <input type="checkbox" id="menu-open" className="hidden" />

      <header
        className="bg-green-200 text-gray-100 flex justify-between md:hidden"
        data-dev-hint="mobile menu bar"
      >
        <div className="flex w-full"></div>

        <label
          htmlFor="menu-open"
          id="mobile-menu-button"
          className="m-2 p-2 focus:outline-none hover:text-white hover:cursor-pointer rounded-md"
        >
          <svg
            id="menu-open-icon"
            className="h-6 w-6 transition duration-200 ease-in-out text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
          <svg
            id="menu-close-icon"
            className="h-6 w-6 transition duration-200 ease-in-out "
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </label>
      </header>

      <aside
        id="sidebar"
        className="bg-green-200 text-center h-full text-gray-100 md:w-[22vw] w-3/4 space-y-6 pt-6 px-0 absolute inset-y-0 left-0 transform md:relative md:translate-x-0 transition duration-200 ease-in-out md:flex md:flex-col md:justify-between overflow-y-auto"
        data-dev-hint="sidebar; px-0 for frameless; px-2 for visually inset the navigation"
      >
        <div
          className="flex flex-col space-y-6"
          data-dev-hint="optional div for having an extra footer navigation"
        >
          {!isLoadingData && !isErrorUser && (
            <nav
              data-dev-hint="main navigation"
              className="flex flex-col w-full my-4 h-20 items-center font-normal text-white text-xl font-Raleway"
            >
              {user ? (
                <img
                  src={dataUser?.avatar_url}
                  alt="avatar"
                  className="text-white w-48 rounded-[50%]"
                />
              ) : (
                <img
                  src={`https://github.com/valtercioj.png`}
                  alt="avatar"
                  className="text-white w-48 rounded-[50%]"
                />
              )}
              <div className="mb-2">
                <span className="font-bold">Nome: </span>
                <span>{dataUser?.login}</span>
              </div>

              <div className="mb-2">
                <span className="font-bold">Repositórios: </span>
                <span>{dataUser?.public_repos}</span>
              </div>
              <div className="mb-2">
                <span className="font-bold">Seguidores: </span>
                <span>{dataUser?.followers}</span>
              </div>
              <div className="mb-2">
                <span className=" font-bold">Seguindo: </span>
                <span>{dataUser?.following}</span>
              </div>
              <div className="bg-green-bg p-2 text-white rounded-lg hover:bg-green-300 flex items-center">
                <span>
                  <AiFillGithub />
                </span>
                <a
                  href={`https://github.com/${dataUser?.login}`}
                  target="_blank"
                >
                  Visualizar
                </a>
              </div>
            </nav>
          )}
        </div>
      </aside>
      <div className="flex pl-12 flex-col md:h-screen items-center lg:items-start w-screen mt-10 md:mt-0 ">
        <div
          className={`w-full h-full ${
            !isLoadingRepos &&
            "grid tablet:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4"
          } `}
        >
          {isLoadingRepos ? (
            <div
              role="status"
              className="flex w-full justify-center items-center h-full"
            >
              <svg
                aria-hidden="true"
                className="w-20 h-20 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-300"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : isErrorRepos && !isLoadingRepos ? (
            <div className="hidden"></div>
          ) : (
            repositories?.map((repo) => {
              return (
                <div
                  className=" flex flex-wrap flex-col border w-80 border-green-200 dark:border-white rounded-md p-4 mt-8 px-6"
                  key={repo.name}
                >
                  <div className="flex w-full justify-around items-center ">
                    <svg
                      aria-hidden="true"
                      height="16"
                      viewBox="0 0 16 16"
                      version="1.1"
                      width="16"
                      data-view-component="true"
                      className="octicon octicon-repo mr-1 color-fg-muted dark:fill-white"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"
                      ></path>
                    </svg>
                    <a
                      className="text-blueText hover:cursor-pointer"
                      href={repo?.html_url}
                    >
                      {repo?.name}
                    </a>
                    <span className="border border-black dark:border-white rounded-[2em] px-2 text-black dark:text-white">
                      {repo?.visibility}
                    </span>
                  </div>
                  {repo?.description && (
                    <div className="w-full text-black dark:text-white overflow-x-hidden">
                      <span>{repo?.description}</span>
                    </div>
                  )}
                  <div className="flex w-full items-center">
                    {repo?.language && (
                      <div className="mt-2 text-black dark:text-white flex items-center mr-2">
                        {repo?.language === "JavaScript" && (
                          <p
                            className={`w-4 h-4 rounded-[50%] bg-JavaScript mr-2`}
                          ></p>
                        )}
                        {repo?.language === "TypeScript" && (
                          <p
                            className={`w-4 h-4 rounded-[50%] bg-TypeScript mr-2`}
                          ></p>
                        )}
                        {repo?.language === "HTML" && (
                          <p
                            className={`w-4 h-4 rounded-[50%] bg-HTML mr-2`}
                          ></p>
                        )}
                        {repo?.language === "CSS" && (
                          <p
                            className={`w-4 h-4 rounded-[50%] bg-CSS mr-2`}
                          ></p>
                        )}
                        {repo?.language === "Python" && (
                          <p
                            className={`w-4 h-4 rounded-[50%] bg-Python mr-2`}
                          ></p>
                        )}
                        {repo?.language === "Java" && (
                          <p
                            className={`w-4 h-4 rounded-[50%] bg-Java mr-2`}
                          ></p>
                        )}
                        {repo?.language === "C++" && (
                          <p
                            className={`w-4 h-4 rounded-[50%] bg-C++ mr-2`}
                          ></p>
                        )}
                        {repo?.language === "C#" && (
                          <p className={`w-4 h-4 rounded-[50%] bg-C# mr-2`}></p>
                        )}
                        {repo?.language === "PHP" && (
                          <p
                            className={`w-4 h-4 rounded-[50%] bg-PHP mr-2`}
                          ></p>
                        )}
                        {repo?.language === "Ruby" && (
                          <p
                            className={`w-4 h-4 rounded-[50%] bg-Ruby mr-2`}
                          ></p>
                        )}
                        {repo?.language === "C" && (
                          <p className={`w-4 h-4 rounded-[50%] bg-C mr-2`}></p>
                        )}
                        {repo?.language === "Go" && (
                          <p className={`w-4 h-4 rounded-[50%] bg-Go mr-2`}></p>
                        )}
                        {repo?.language === "Shell" && (
                          <p
                            className={`w-4 h-4 rounded-[50%] bg-Shell mr-2`}
                          ></p>
                        )}
                        {repo?.language === "Swift" && (
                          <p
                            className={`w-4 h-4 rounded-[50%] bg-Swift mr-2`}
                          ></p>
                        )}
                        {repo?.language === "Kotlin" && (
                          <p
                            className={`w-4 h-4 rounded-[50%] bg-Kotlin mr-2`}
                          ></p>
                        )}

                        <span>{repo?.language}</span>
                      </div>
                    )}
                    {repo?.stargazers_count > 0 && (
                      <div className="mt-2 text-black dark:text-white flex items-center">
                        <p className="mr-1">
                          <AiOutlineStar />
                        </p>
                        <span>{repo?.stargazers_count}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
