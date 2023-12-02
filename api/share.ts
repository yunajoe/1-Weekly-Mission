export type User = {
  id: number;
  name: string;
  email: string;
  profileImageSource: string;
};

export type getUserResponse = {
  data: User;
};
export type Owner = {
  id: number;
  name: string;
  profileImageSource: string;
};
export type Link = {
  id: number;
  createdAt: string;
  url: string;
  title: string;
  description: string;
  imageSource: string;
};
export type Folder = {
  id: number;
  name: string;
  owner: Owner;
  links: Link[];
  count: number;
};

export type getUserFolderResponse = {
  data: Folder;
};

const baseUrl = new URL("https://bootcamp-api.codeit.kr");
const getUrl = (path: string) => new URL(path, baseUrl);

export const getShareUserData = async () => {
  const requestUrl = getUrl("/api/sample/user");
  const response = await fetch(requestUrl, {
    method: "GET",
  });

  if (response.status === 200) {
    const jsonData = await response.json();
    return jsonData as Promise<getUserResponse>;
  }
};

export const getShareFolderData = async () => {
  const requestUrl = getUrl("/api/sample/folder");
  const response = await fetch(requestUrl, {
    method: "GET",
  });
  if (response.status === 200) {
    const jsonData = await response.json();
    return jsonData as Promise<getUserFolderResponse>;
  }
};
