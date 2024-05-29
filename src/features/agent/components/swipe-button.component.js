import React from "react";
import SwipeButton from "rn-swipe-button";
export const Swipe = () => {
  const [title, setTitle] = React.useState("");
  return (
    <SwipeButton
      disabled={false}
      //disable the button by doing true (Optional)
      swipeSuccessThreshold={70}
      height={45}
      //height of the button (Optional)
      width={330}
      //width of the button (Optional)
      title={title}
      //Text inside the button (Optional)
      //thumbIconImageSource={thumbIcon}
      //You can also set your own icon (Optional)
      onSwipeSuccess={() => {
        alert("Submitted Successfully!");

        setTitle(" Submit");
      }}
      shouldResetAfterSuccess={true}
      //After the completion of swipe (Optional)
      railFillBackgroundColor="#6200EE" //(Optional)
      railFillBorderColor="#e688ff" //(Optional)
      thumbIconBackgroundColor="#6200EE" //(Optional)
      thumbIconBorderColor="#ed9aff" //(Optional)
      railBackgroundColor="#F1F1F1" //(Optional)
      railBorderColor="#bbeaff" //(Optional)
    />
  );
};
