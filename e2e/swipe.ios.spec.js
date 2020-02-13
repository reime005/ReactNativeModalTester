describe('RNModalTest App', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should hide scroll modal via swipe down', async () => {
    await element(by.id('btn_scroll_modal_toggle')).tap();

    await expect(element(by.id('scroll_view'))).toBeVisible();
    await expect(element(by.id('scroll_fixed_text'))).toBeVisible();

    await element(by.id('scroll_fixed_text')).swipe('down', 'fast');
    await expect(element(by.id('scroll_view'))).toBeNotVisible();
  });

  it('should hide flatlist modal via swipe down', async () => {
    await element(by.id('btn_flatlist_modal_toggle')).tap();

    await expect(element(by.id('flatlist_view'))).toBeVisible();
    await expect(element(by.id('scroll_fixed_text'))).toBeVisible();

    await element(by.id('flatlist_fixed_text')).swipe('down', 'fast');

    await expect(element(by.id('flatlist_view'))).toBeNotVisible();
  });
});
