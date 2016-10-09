require "spec_helper"
require "./lib/instagram_wrapper"

describe InstagramWrapper do
  subject { described_class.instance }

  it "can search" do
    expect(subject.send(:client).access_token).to_not be_nil
  end

  it "gets recent photos" do
    expect(subject.recent.count).to eq(20)
  end
end
