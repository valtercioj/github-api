import { createContext, useState } from "react";
import Layout from "./components/Layout";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "./services/api";

import Repository from "./components/Repository";
export const pageProvider = createContext({} as any);

import { toast } from "react-toastify";
const schema = yup
  .object({
    username: yup.string().required("Campo obrigatório"),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const [page, setPage] = useState<number>(1);
  const [user, setUser] = useState<string>("");
  const [error, setError] = useState<string>("");
  const onSubmit = (data: FormData) => {
    api
      .get(`/users/${data.username}`)
      .then(() => {
        setUser(data.username);
        setPage(page + 1);
      })
      .catch(() => {
        {
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
        }
      });
  };
  return (
    <pageProvider.Provider value={{ page, setPage }}>
      <Layout>
        {page === 1 ? (
          <div className="h-full w-full flex justify-center items-center">
            <form
              className="flex flex-col items-center w-full"
              onSubmit={handleSubmit(onSubmit)}
            >
              <label
                htmlFor="user"
                className="font-Montserrat text-2xl font-medium leading-3 text-textGray dark:text-white-default mb-4"
              >
                Usuário do Github
              </label>
              <input
                type="text"
                id="user"
                {...register("username")}
                placeholder="Nome de usuário"
                className={`h-12 w-2/4 pl-4 rounded-lg bg-gray-200 flex justify-center items-center border-2 ${
                  errors.username
                    ? "border-red-600 focus:border-red-600"
                    : "border-green-300 focus:border-green-400"
                }  mb-4 `}
              />
              {errors.username && (
                <p className="text-red-600 text-base font-semibold mb-4">
                  {errors.username.message}
                </p>
              )}

              <button
                type="submit"
                className="h-10 w-40 text-white	bg-green-200 flex justify-center items-center hover:cursor-pointer text-1xl rounded-lg"
              >
                Buscar
              </button>
            </form>
          </div>
        ) : (
          <Repository user={user} />
        )}
      </Layout>
    </pageProvider.Provider>
  );
}

export default App;
