import * as React from "react";
import TopNavigation from "@cloudscape-design/components/top-navigation";

import { Auth } from 'aws-amplify';
import {useEffect, useState} from "react";

export default () => {

    const [username, setUsername] = useState("");

    useEffect(() => {

        const load = async () => {
            Auth.currentUserInfo().then(
                (result) => {
                    setUsername(result.attributes.email);
                }
            )
        };

        load();
    }, []);


    return (
        <TopNavigation
            identity={{
                href: "#",
                title: "Online Document Manager",
            }}
            utilities={[
                {
                    type: "menu-dropdown",
                    text: username,
                    iconName: "user-profile",
                    items: [
                        {id: "profile", text: "Profile"},
                        { id: "signout", text: "Sign out" },
                    ]
                }
            ]}
            i18nStrings={{
                searchIconAriaLabel: "Search",
                searchDismissIconAriaLabel: "Close search",
                overflowMenuTriggerText: "More",
                overflowMenuTitleText: "All",
                overflowMenuBackIconAriaLabel: "Back",
                overflowMenuDismissIconAriaLabel: "Close menu"
            }}
        />
    );
}