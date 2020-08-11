describe('Test App', () => {
  beforeEach(async () => {
    await device.terminateApp();
    await device.launchApp();
  });

  it('should hide scroll modal via swipe down', async () => {
    await element(by.id('btn_scroll_modal_toggle')).tap();

    await expect(element(by.id('scroll_view'))).toBeVisible();
    await expect(element(by.id('scroll_fixed_text'))).toBeVisible();

    await element(by.id('scroll_modal_view')).swipe('down', 'fast', 1.0);

    await waitFor(element(by.id('flatlist_view')))
      .toBeNotVisible()
      .withTimeout(2000);
  });

  it('should hide flatlist modal via swipe down', async () => {
    await element(by.id('btn_flatlist_modal_toggle')).tap();

    await expect(element(by.id('flatlist_view'))).toBeVisible();
    await expect(element(by.id('flatlist_fixed_text'))).toBeVisible();

    await element(by.id('flatlist_modal_view')).swipe('down', 'fast', 1.0);

    await waitFor(element(by.id('flatlist_view')))
      .toBeNotVisible()
      .withTimeout(2000);
  });

  it('should hide image list modal via swipe down', async () => {
    await element(by.id('btn_image_scroll_modal_toggle')).tap();

    await waitFor(element(by.id('image_scroll_modal')))
      .toBeVisible()
      .withTimeout(1000);

    await expect(element(by.id('image_scroll_modal'))).toBeVisible();
    await expect(element(by.id('flatlist_modal_view'))).toBeVisible();
    await expect(element(by.id('pull_down_bar'))).toBeVisible();

    await element(by.id('image_scroll_modal')).swipe('down', 'fast', 1);

    await waitFor(element(by.id('image_scroll_view')))
      .toBeNotVisible()
      .withTimeout(4000);
  });
});
