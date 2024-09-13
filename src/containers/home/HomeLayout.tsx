import {
  Container,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Heading,
  TabProps,
  Box,
  Grid,
} from "@chakra-ui/react";
import React, { useState } from "react";
import InterviewSettingsForm from "./InterviewSettingsForm";
import JobDetailsForm from "./JobDetailsForm";
import RequisitionForm from "./RequisitionDetailsForm";
import PreviewCard from "./PreviewCard";
import { PageNumbers } from "../../interface/home";
import { useData } from "./DataProvider";

const CustomTab: React.FC<TabProps> = ({ children, ...props }) => {
  return (
    <Tab p="1rem" fontFamily="Poppins" {...props}>
      {children}
    </Tab>
  );
};

const HomeLayout = () => {
  const [page, setPage] = useState<PageNumbers>(0);
  const { state, setState } = useData();

  const handlePage = (pageNumber: PageNumbers) => {
    setPage(pageNumber);
  };

  const handleRequisitionDetailsChange = (details) => {
    setState((prevState) => ({
      ...prevState,
      requisitionDetails: details,
    }));
  };

  const handleJobDetailsChange = (details) => {
    setState((prevState) => ({
      ...prevState,
      jobDetails: details,
    }));
  };

  const handleInterviewSettingsChange = (settings) => {
    setState((prevState) => ({
      ...prevState,
      interviewSettings: settings,
    }));
  };

  return (
    <Box w="100%">
      <Container maxW="1200px">
        <Heading fontFamily="Poppins" fontSize="1.5rem" my="2rem">
          Create Candidate Requisition
        </Heading>
        <Tabs index={page} isLazy lazyBehavior="keepMounted">
          <TabList>
            <CustomTab>Requisition Details</CustomTab>
            <CustomTab>Job Details</CustomTab>
            <CustomTab>Interview Settings</CustomTab>
          </TabList>
          <Grid display="grid" gridTemplateColumns="3fr 2fr" gap="24px">
            <TabPanels>
              <TabPanel>
                <RequisitionForm
                  handleTab={handlePage}
                  requisitionDetails={state.requisitionDetails}
                  onChange={handleRequisitionDetailsChange}
                />
              </TabPanel>
              <TabPanel>
                <JobDetailsForm
                  handleTab={handlePage}
                  jobDetails={state.jobDetails}
                  onChange={handleJobDetailsChange}
                />
              </TabPanel>
              <TabPanel>
                <InterviewSettingsForm
                  handleTab={handlePage}
                  interviewSettings={state.interviewSettings}
                  onChange={handleInterviewSettingsChange}
                />
              </TabPanel>
            </TabPanels>
            <PreviewCard
              requisitionDetails={state.requisitionDetails}
              jobDetails={state.jobDetails}
              interviewSettings={state.interviewSettings}
            />
          </Grid>
        </Tabs>
      </Container>
    </Box>
  );
};

export default HomeLayout;