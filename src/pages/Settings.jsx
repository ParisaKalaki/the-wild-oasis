import Heading from "../ui/Heading";
import Row from "../ui/Row";
import SettingRow from "../features/settings/UpdateSettingsForm";

function Settings() {
  return (
    <>
      <Row>
        <Heading as="h1">Update hotel settings</Heading>
      </Row>

      <Row>
        <SettingRow />
      </Row>
    </>
  );
}

export default Settings;
