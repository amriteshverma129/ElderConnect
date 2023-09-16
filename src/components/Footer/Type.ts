import {
    GetAllAboutLoopVillagesQuery,
    GetAllCareerssQuery,
    GetAllFaQsQuery,
    GetAllFoundersQuery,
} from "../../generated/graphql";

export interface FooterDetailPageProps {
    allFaqs?: GetAllFaQsQuery["allFaqs"];
    allAboutloopvilages?: GetAllAboutLoopVillagesQuery["allAboutloopvilages"];
    allCareerss?: GetAllCareerssQuery["allCareerss"];
    allFounders?: GetAllFoundersQuery["allFounders"];
}
