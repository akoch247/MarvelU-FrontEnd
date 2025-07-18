export const departments = [
    {
        id: 1,
        name: "BioChem",
        banner_img: "/biochem.webp",
        faculty: [3]
    },
    {
        id: 2,
        name: "Engineering",
        banner_img: "engineering.jpg",
        faculty: [2]
    },
    {
        id: 3,
        name: "Astrophysics",
        banner_img: "astrophysics.jpg",
        faculty: [2]
    },
    {
        id: 4,
        name: "Admin",
        banner_img: "admin.webp",
        faculty: [2]
    },
    {
        id: 5,
        name: "Athletic",
        banner_img: "athletic.png",
        faculty: [2]
    }
];

export const professors = [
    {
        id: 1,
        name: "Hulk",
        department: "BioChem",
        superpower: "strength",
        dateOfHire:  "02-19-2000",
        email: "Hulk@marvelu.org",
        profile_img: "/hulk.avif",
        department_id: 1,
    },
    {
        id: 2,
        name: "Peter Parker",
        department: "BioChem",
        superpower: "strength, speed, agility",
        dateOfHire:  "12-10-2015",
        email: "PeterParker@marvelu.org",
        profile_img: "/peterparker.jpg",
        department_id: 1,
    }
]