describe('RNModalTest android swipe', () => {
  beforeEach(async () => {
    await device.terminateApp();
    await device.launchApp();
  });

  it('should hide scroll modal via swipe down', async () => {
    await element(by.id('btn_scroll_modal_toggle')).tap();

    await expect(element(by.id('scroll_view'))).toBeVisible();
    await expect(element(by.id('scroll_fixed_text'))).toBeVisible();

    if (/android/i.test(process.env.configuration)) {
      await element(by.id('scroll_modal_view')).swipe('down', 'fast', 1.0);
    } else {
      await element(by.id('scroll_fixed_text')).swipe('down', 'fast');
    }

    await expect(element(by.id('scroll_view'))).toBeNotVisible();
  });

  it('should hide flatlist modal via swipe down', async () => {
    await element(by.id('btn_flatlist_modal_toggle')).tap();

    await expect(element(by.id('flatlist_view'))).toBeVisible();
    await expect(element(by.id('flatlist_fixed_text'))).toBeVisible();

    if (/android/i.test(process.env.configuration)) {
      await element(by.id('flatlist_modal_view')).swipe('down', 'fast', 1.0);
    } else {
      await element(by.id('flatlist_fixed_text')).swipe('down', 'fast');
    }

    await expect(element(by.id('flatlist_view'))).toBeNotVisible();
  });
});
