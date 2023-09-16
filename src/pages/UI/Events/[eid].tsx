import React from "react";
import dynamic from "next/dynamic";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Loader2 from "../../../components/Loader/Loader2";
import { withLayout } from "../../../components/Layout/withLayout";
import { EventDetailSkeleton } from "../../../components/Event/EventDetailSkeleton";
import { useUser } from "../../../components/Authenticate/UserContext";
const EventDetail = dynamic(() => import("../../../components/Event/EventDetail"), {
    loading: () => <EventDetailSkeleton />,
});

const EventDetailPage: NextPage = () => {
    const router = useRouter();
    const { user } = useUser();

    if (user.email || user.phone_number) {
        return <EventDetail meetingId={router.query.eid} startTime={router.query.startTime} />;
    }
    return <Loader2 />;
};

export default withLayout(EventDetailPage);
