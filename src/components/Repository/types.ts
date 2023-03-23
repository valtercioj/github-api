export type IReposityProps = {
  name: string;
  description: string;
  stargazers_count: number;
  html_url: string;
  language: string;
  visibility: string;
};

export type IDataUser = {
  login: string;
  bio: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
};
export type IProps = {
  user: string;
};
