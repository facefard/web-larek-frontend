export function validateAddressInput(addressInput: HTMLInputElement, nextButton: HTMLButtonElement): void {
  addressInput.addEventListener("input", () => {
      if (addressInput.value.trim() !== "") {
          nextButton.disabled = false;
      } else {
          nextButton.disabled = true;
      }
  });
}

export function validateBasketItems(basketItemsCount: number, orderButton: HTMLButtonElement): void {
  if (basketItemsCount === 0) {
      orderButton.disabled = true;
  } else {
      orderButton.disabled = false;
  }
}

export function validateFormInputs(emailInput: HTMLInputElement, phoneInput: HTMLInputElement, submitButton: HTMLButtonElement): void {
  if (emailInput.value.trim() !== "" && phoneInput.value.trim() !== "") {
      submitButton.disabled = false;
  } else {
      submitButton.disabled = true;
  }
}