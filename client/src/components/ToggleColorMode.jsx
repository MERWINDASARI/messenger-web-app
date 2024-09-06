import { Button, useColorMode } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import styles from "./togglecolormode.module.css";

export default function ToggleColorMode() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Button
        className={styles.toggleButton}
        onClick={() => toggleColorMode()}
        position="absolute"
      >
        {colorMode === "dark" ? (
          <SunIcon color="orange.500" />
        ) : (
          <MoonIcon color="blue.500" />
        )}
      </Button>
    </>
  );
}
