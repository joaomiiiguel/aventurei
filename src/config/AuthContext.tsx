/* eslint-disable @typescript-eslint/no-unused-expressions */
import { UserType } from "@/types/User";
import { AuthValuesType, LoginParams, RegisterParams } from "@/types/Auth";
import { supabase } from "@/services/supabase";
import { createContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(null),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
};

const AuthContext = createContext(defaultProvider);

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<UserType | null>(defaultProvider.user);
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading);
  const router = useRouter();

  useEffect(() => {
    const token = window.localStorage.getItem("storageTokenEcoRoteiros");
    console.log("Verifica Token");

    const init = async () => {
      if (token) {
        const { data: userToken, error } = await supabase.auth.getUser(token!);

        if (error) {
          console.log(error);
          if (error.code === "bad_jwt") {
            return router.replace("/");
          }
        }

        const { data: dataProfile, error: errorProfile } = await supabase
          .from("users")
          .select("*")
          .eq("id", `${userToken.user?.id}`);

        if (errorProfile) {
          console.log(errorProfile);
        }

        if (dataProfile) {
          setUser({
            id: dataProfile[0].id,
            name: dataProfile[0].name,
            nickname: dataProfile[0].nickname,
            cpf: dataProfile[0].cpf,
            email: dataProfile[0].email,
            phone: dataProfile[0].phone,
            created_at: dataProfile[0].created_at,
            profile: dataProfile[0].profile,
            avatar: dataProfile[0].avatar,
            city: dataProfile[0].city,
            UF: dataProfile[0].UF,
            short_description: dataProfile[0].short_description,
          });
        }
      } else setUser(null);
    };

    init();
  }, []);

  const handleLogin = (params: LoginParams) => {
    supabase.auth
      .signInWithPassword({
        email: params.email,
        password: params.password,
      })
      .then((response) => {
        if (response.error) {
          response.error.message === "Invalid login credentials"
            ? toast.error("Login Inválido")
            : toast.error(`${response.error.message}`);
          return;
        }

        window.localStorage.setItem(
          "storageTokenEcoRoteiros",
          response.data.session?.access_token
        );

        toast.success("Login com sucesso");
      })
      .catch((error) => console.log(error))
      .finally(() => {
        console.log(user);
      });
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error(`${error.message}`);
    }
    window.localStorage.removeItem("storageTokenEcoRoteiros");
    setUser(null);
    router.replace("/");
  };
  const handleRegister = async (formData: RegisterParams) => {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.status === 201) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  };

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
