/** @format */
// navbar/ListMenus.tsx
import { MenuItem } from "@/types";
import {
  AsteriskSquareIcon,
  BookOpenText,
  Download,
  GalleryHorizontal,
  LayoutDashboard,
  Newspaper,
  ServerIcon,
  User2,
} from "lucide-react";

const ListMenu: MenuItem[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: <AsteriskSquareIcon />,
    children: [
      {
        name: "Sejarah & Visi Misi",
        href: "/profile/sejarah-visimisi",
      },
      {
        name: "Pimpinan FST",
        href: "/profile/pimpinan-fst",
      },
      {
        name: "Lokasi",
        href: "/profile/lokasi",
      },
    ],
  },
  {
    name: "Program Studi",
    href: "/prodi",
    icon: <BookOpenText />,
    children: [
      {
        name: "Sistem Informasi",
        href: "/prodi/sistem-informasi",
      },
      {
        name: "Geologi",
        href: "/prodi/geologi",
      },
      {
        name: "Biologi",
        href: "/prodi/biologi",
      },
      {
        name: "Laboratorium",
        href: "https://lab.fstuogp.com",
        blank: true,
      },
    ],
  },
  {
    name: "Galeri",
    href: "/galeri",
    icon: <GalleryHorizontal />,
    children: [
      {
        name: "Foto",
        href: "/galeri/foto",
      },
      {
        name: "Video",
        href: "/galeri/video",
      },
    ],
  },
  {
    name: "Berita & Pengumuman",
    icon: <Newspaper />,
    children: [
      {
        name: "Berita",
        href: "/berita/list",
      },
      {
        name: "Pengumuman",
        href: "/pengumuman/list",
      },
    ],
  },
  {
    name: "Layanan",
    href: "/layanan",
    icon: <ServerIcon />,
    children: [
      {
        name: "Kesehatan",
        href: "/layanan/kesehatan",
      },
      {
        name: "Survei Kepuasan",
        href: "/layanan/survei",
      },
    ],
  },
  {
    name: "Download",
    href: "/download",
    icon: <Download />,
    children: [
      {
        name: "Jadwal",
        href: "/download/jadwal",
      },
      {
        name: "Dokumen",
        href: "/download/dokumen",
      },
    ],
  },
  {
    name: "Komunitas",
    href: "/komunitas",
    icon: <User2 />,
    children: [
      {
        name: "Mahasiswa",
        href: "/komunitas/mahasiswa",
      },
      {
        name: "Alumni",
        href: "/komunitas/alumni",
      },
    ],
  },
];

export default ListMenu;
