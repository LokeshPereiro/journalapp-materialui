import { useDispatch, useSelector } from "react-redux";
import { startNewNote, isSavingNewNote } from "../../store/journal";
import { AddOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { JournalLayout } from "../layout/JournalLayout";
import { NoteView, NthSelectedView } from "../views";

export const JournalPage = () => {
  const dispatch = useDispatch();

  const { isSaving, active: activeNote } = useSelector(
    (state) => state.journal
  );
  const handleNewNote = () => {
    dispatch(startNewNote());
  };
  return (
    <JournalLayout>
      {!!activeNote ? <NoteView /> : <NthSelectedView />}

      <IconButton
        disabled={isSaving}
        size="large"
        sx={{
          color: "white",
          backgroundColor: "error.main",
          ":hover": { backgroundColor: "error.main", opacity: 0.9 },
          position: "fixed",
          right: 50,
          bottom: 50,
        }}
        onClick={handleNewNote}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>
    </JournalLayout>
  );
};
