import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from "@storybook/react";
import { action, configureActions } from "@storybook/addon-actions";
import { StationDTO } from "sbb-webservice";
import StationSearchField from "../src/components/stationSearchField";
import { StationApiService } from "../src/service";


class ApiMock extends StationApiService {
    private data: StationDTO[];

    public constructor() {
        super();

        this.data = [
            {
                id: "1",
                name: "Bern",
            },
            {
                id: "2",
                name: "Zürich",
            },
            {
                id: "3",
                name: "Genf",
            },
        ];
    }

    public search(): Promise<StationDTO[]> {
        return Promise.resolve(this.data);
    }
}

storiesOf("StationSearchField", module)
    .add("default", (): JSX.Element => (
        <StationSearchField
            api={new ApiMock()}
            onChange={action("onChangeValue")}
        />
    ));
