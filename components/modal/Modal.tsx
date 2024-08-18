// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useRouter } from "next/router";
// import styles from "./Modal.module.css";
// type TabName = "add" | "change" | "delete" | "deleteLink";

// export default function Modal() {
//   const queryClient = useQueryClient();
//   const router = useRouter();

//   const { id } = router.query;

//   const deleteLinkMutation = useMutation({
//     mutationKey: ["deleteLink"],
//     mutationFn: (linkId: number) => deleteLink(linkId),
//     onSettled: () => {
//       queryClient.invalidateQueries({ queryKey: ["FolderLink", Number(id)] });
//     },
//   });

//   const handleDeleteLink = (linkId: number) => {
//     deleteLinkMutation.mutate(linkId, {
//       onSuccess: () => {
//         setterFunc(false);
//       },
//     });
//   };

//   const callbackFunctionObj: Record<TabName, () => void> = {
//     deleteLink: () => {
//       const targetLink = linkList?.find((link) => link.url === linkUrl)!;
//       handleDeleteLink(targetLink.id);
//     },
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.modal__container}>
//         <button
//           className={styles.cancel__button}
//           onClick={() => {
//             setterFunc(false);
//           }}
//         >
//           X
//         </button>

//         {tabName === "deleteLink" && <p>{linkUrl}</p>}
//       </div>
//     </div>
//   );
// }
